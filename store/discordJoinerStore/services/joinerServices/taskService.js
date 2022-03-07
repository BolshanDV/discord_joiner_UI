import axios from "axios";
import {solveCaptcha} from "./captchaService";
import {buildHeaders} from "../../utils/requestUtils";
import {getMe} from "./validateService";
import {findTask} from "../../utils/taskUtils";

const tasks = [];

// sleep function for delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getFormRules = async (inviteCode, guildId, token, email) => {
    return await axios.get(`https://discord.com/api/v9/guilds/${guildId}/member-verification?with_guild=false&invite_code=${inviteCode}`, {
        withCredentials: true,
        headers: buildHeaders(token, email)
    })
        .then(response => {
            return response.data;
        })
        .catch((error) => console.log(error));
}

export const getterTokens = (taskName) => {
    return findTask(tasks, taskName).task;
}

// main task management function
export async function launchTasks(body) {
    const successTokens = [];
    const errorTokens = [];

    if (tasks.length ===0 || !findTask(tasks, body.taskName).status)
        tasks.push({taskName: body.taskName, successTokens: successTokens, errorTokens: errorTokens})

    for (const token of body.tokens) {
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
            successTokens.push({username: token.username, token: token.token});
        } else if (joinStatus && acceptRulesStatus && body.reactionClickerFlag) {
            const reactionStatus = await setReaction(token.token, me.email, body.reactionClickerObj);

            if (reactionStatus) {
                successTokens.push({ username: token.username, token: token.token });
            } else {
                errorTokens.push(token);
            }
        } else if (joinStatus && acceptRulesStatus && body.sendCommandFlag) {
            const sendCommandStatus = await sendCommand(token.token, me.email, body.sendCommandObj);

            if (sendCommandStatus) {
                successTokens.push({ username: token.username, token: token.token });
            } else {
                errorTokens.push(token);
            }
        } else {
            errorTokens.push(token);
        }

        await sleep(body.delay);
    }

    return {successTokens: successTokens, errorTokens: errorTokens};
}

async function joinChannel(inviteCode, token, email) {
    const captchaToken = await solveCaptcha();

    let body;
    let statusCode = 400;

    await axios.post(`https://discord.com/api/v9/invites/${inviteCode}`,{
        'captcha_key': captchaToken
    }, {
        withCredentials: true,
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

    let statusCode = 400;
    let body;

    await axios.put(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}/reactions/${reactionId}/%40me`, null,{
        withCredentials: true,
        headers: buildHeaders(token, email)
    })
        .then(response => {
            statusCode = response.status;
            body = response.data;
        })
        .catch(error => console.log(error))

    return statusCode === 200;
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
        headers: buildHeaders(token, email)
    }).then(response => {
        statusCode = response.status;
        body = response.data;
    }).catch(error => console.log(error));

    return statusCode === 200;
}
