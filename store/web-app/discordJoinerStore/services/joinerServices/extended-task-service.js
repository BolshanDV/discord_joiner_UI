import axios from "axios";
import {solveCaptcha} from "@/store/web-app/captchaSettingsStore/captcha-service";
import {buildHeaders} from "@/store/web-app/utils/requestUtils";
import {getMe} from "./validate-service";
import {findTask} from "@/store/web-app/utils/taskUtils";
import {logs} from "@/store/web-app/logger";

let key = '';
let captchaServiceType = '';

let criticalStopFlag = false;
let pauseFlag = false;

export function setStopCriticalFlag() {
    criticalStopFlag = true;
}

export function changePauseFlag() {
    pauseFlag = !pauseFlag;
}

export function setStartCriticalFlag() {
    criticalStopFlag = false;
}

export function setCaptchaConfig(captchaType, apiKey) {
    key = apiKey;
    captchaServiceType = captchaType;
}

let pause = 500;

export const tasks = [];
export const controller = new AbortController();

// sleep function for delay
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function checker() {
    setInterval(() => {
        if (pauseFlag) {
            pause = 1000000000000;
        } else {
            pause = 500;
        }
    }, 100);
}

export const getterTokens = (taskName) => {
    return findTask(tasks, taskName).task;
}

// main task management function
export async function launchTasks(body) {
    checker();

    const successTokens = [];
    const errorTokens = [];

    if (tasks.length === 0 || !findTask(tasks, body.taskName).status) {
        tasks.push({
            taskName: body.taskName,
            abortController: controller.signal,
            successTokens: successTokens,
            errorTokens: errorTokens
        });
    }

    for (const token of body.tokens) {
        if (pauseFlag) await sleep(pause);
        if (criticalStopFlag) {
            tasks.length = 0;
            logs.push({type: 'JOINER', subtype: 'INFO', message: `All tasks will be stopped`});
            break;
        }
        // execute a request to get information about the user to receive mail
        const me = await getMe(token.token);

        // after that we pass email and token to the function of joining the channel itself
        const joinStatus = await joinChannel(body.inviteCode, token.token, me.email);
        let acceptRulesStatus = true;

        if (body.accept_rules) {
            acceptRulesStatus = await acceptRules(body.inviteCode, body.guildId, token.token, me.email);

            if (acceptRulesStatus) {
                logs.push({type: 'JOINER', subtype: 'INFO', message: `Discord account ${token.username} successfully accepted rules`})
            } else {
                logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${token.username} while sending the message command`})
            }
        }
        //In this if there will be a large number of checks for all kinds of situations:
        // 1) is reaction clicker enabled
        // 2) is send command enabled
        // Depending on this, there may be a need for additional requests, as a result
        // of which they must be added to success tokens to display the current status of the task to the client

        if (joinStatus && acceptRulesStatus && !body.reactionClickerFlag && !body.sendCommandFlag) {
            successTokens.push({ username: token.username, token: token.token });
            logs.push({type: 'JOINER', subtype: 'INFO', message: `Discord account ${token.username} successfully entered the channel`});
        } else if (joinStatus && acceptRulesStatus && body.reactionClickerFlag) {
            const reactionStatus = await setReaction(token.token, me.email, body.reactionClickerObj);

            if (reactionStatus) {
                successTokens.push({ username: token.username, token: token.token });
                logs.push({type: 'JOINER', subtype: 'INFO', message: `Discord account ${token.username} successfully set a reaction`});
            } else {
                errorTokens.push(token);
                logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${token.username} while posting a reaction`});
            }
        } else if (joinStatus && acceptRulesStatus && body.sendCommandFlag) {
            const sendCommandStatus = await sendCommand(token.token, me.email, body.sendCommandObj);

            if (sendCommandStatus) {
                successTokens.push({ username: token.username, token: token.token });
                logs.push({type: 'JOINER', subtype: 'INFO', message: `Discord account ${token.username} successfully send the message command`});
            } else {
                errorTokens.push(token);
                logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${token.username} while sending the message command`});
            }
        } else {
            errorTokens.push(token);
            logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${token.username} while joining the channel`});
        }
        await sleep(body.delay);
    }

    return {successTokens: successTokens, errorTokens: errorTokens};
}

//**********************************************************************************************
//*******The function block is the main purpose of sending a request to the discord api*********
//**********************************************************************************************

async function joinChannel(inviteCode, token, email) {
    const captchaToken = await solveCaptcha(captchaServiceType, key);

    let body;
    let statusCode = 400;

    await axios.post(`https://discord.com/api/v9/invites/${inviteCode}`,{
        'captcha_key': captchaToken
    }, {
        withCredentials: true,
        signal: controller.signal,
        // build headers functions will be generate some headers and created minimal version of request
        headers: buildHeaders(token, email)
    })
        .then(response => {
            statusCode = response.status;
            body = response.data;
        })
        .catch(error => console.log(error))

    return statusCode === 200;
}

async function setReaction(token, email, reactionObject) {
    const {channelId, messageId, reactionId} = reactionObject;

    console.log(reactionObject)

    let statusCode = 400;
    let body;

    await axios.put(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}/reactions/${reactionId}/%40me`, null,{
        withCredentials: true,
        signal: controller.signal,
        headers: buildHeaders(token, email)
    })
        .then(response => {
            statusCode = response.status;
            body = response.data;
        })
        .catch(error => console.log(error))

    return statusCode === 204;
}

async function acceptRules(inviteCode, guildId, token, email) {
    const formRules = await getFormRules(inviteCode, guildId, token, email);

    let statusCode = 400;
    let body;
    const payload = {
        form_fields: formRules.form_fields,
        version: formRules.version
    }

    await axios.put(`https://discord.com/api/v9/guilds/${guildId}/requests/@me`, payload, {
        withCredentials: true,
        signal: controller.signal,
        headers: buildHeaders(token, email)
    })
        .then(response => {
            statusCode = response.status;
            body = response.data;
        }).catch(error => console.log(error));

    return statusCode === 200;
}

async function sendCommand(token, email, sendCommandObj) {
    let statusCode = 400;
    let body;

    const payload = {
        content: sendCommandObj.commandText,
        nonce: 0,
        tts: false
    }

    await axios.post(`https://discord.com/api/v9/channels/${sendCommandObj.channelId}/messages`, payload, {
        withCredentials: true,
        signal: controller.signal,
        headers: buildHeaders(token, email)
    }).then(response => {
        statusCode = response.status;
        body = response.data;
    }).catch(error => console.log(error));

    return statusCode === 200;
}

const getFormRules = async (inviteCode, guildId, token, email) => {
    return await axios.get(`https://discord.com/api/v9/guilds/${guildId}/member-verification?with_guild=false&invite_code=${inviteCode}`, {
        withCredentials: true,
        signal: controller.signal,
        headers: buildHeaders(token, email)
    })
        .then(response => {
            return response.data;
        })
        .catch((error) => console.log(error));
}
