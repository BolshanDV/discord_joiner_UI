import axios from "axios";
import {solveCaptcha} from "./captchaService";
import {buildHeaders} from "../../../utils/requestUtils";
import {getMe} from "./validateService";
import {findTask} from "../../../utils/taskUtils";

let criticalStopFlag = false;
let pauseFlag = false;

export function setStopCriticalFlag() {
    criticalStopFlag = true;
}

export function setStartCriticalFlag() {
    criticalStopFlag = false;
}

let pause = 500;

export const tasks = [];
export const controller = new AbortController();

// sleep function for delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const logs = [];

function checker() {
    setInterval(() => {
        if (pauseFlag) {
            pause = 1000000000000;
        } else {
            pause = 500;
        }
    }, 100);
}

// clear logs function
export function clearLogs() {
    logs.length = 0;
}

// stop all tasks
export function abortReqs() {
    controller.abort();
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
            break;
        }
        // execute a request to get information about the user to receive mail
        const me = await getMe(token.token);

        // after that we pass email and token to the function of joining the channel itself
        const joinStatus = await joinChannel(body.inviteCode, token.token, me.email);
        let acceptRulesStatus = true;

        if (body.accept_rules) acceptRulesStatus = await acceptRules(body.inviteCode, body.guildId, token.token, me.email);
        //In this if there will be a large number of checks for all kinds of situations:
        // 1) is reaction clicker enabled
        // 2) is send command enabled
        // Depending on this, there may be a need for additional requests, as a result
        // of which they must be added to success tokens to display the current status of the task to the client

        if (joinStatus && acceptRulesStatus && !body.reactionClickerFlag && !body.sendCommandFlag) {
            successTokens.push({ username: token.username, token: token.token });
            logs.push({ username: token.username, token: token.token, info: 'Account successfully in the channel'})
        } else if (joinStatus && acceptRulesStatus && body.reactionClickerFlag) {
            const reactionStatus = await setReaction(token.token, me.email, body.reactionClickerObj);

            if (reactionStatus) {
                successTokens.push({ username: token.username, token: token.token });
                logs.push({ username: token.username, token: token.token, info: 'The reaction has been set'})
            } else {
                errorTokens.push(token);
                logs.push({ username: token.username, token: token.token, info: 'Error during the setting of the reaction'})
            }
        } else if (joinStatus && acceptRulesStatus && body.sendCommandFlag) {
            const sendCommandStatus = await sendCommand(token.token, me.email, body.sendCommandObj);

            if (sendCommandStatus) {
                successTokens.push({ username: token.username, token: token.token });
                logs.push({ username: token.username, token: token.token, info: 'Error in putting down the command'})
            } else {
                errorTokens.push(token);
            }
        } else {
            errorTokens.push(token);
            logs.push({ username: token.username, token: token.token, info: 'Channel entry error'})
        }
        await sleep(body.delay);
    }

    return {successTokens: successTokens, errorTokens: errorTokens};
}

//**********************************************************************************************
//*******The function block is the main purpose of sending a request to the discord api*********
//**********************************************************************************************

async function joinChannel(inviteCode, token, email) {
    const captchaToken = await solveCaptcha();

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
