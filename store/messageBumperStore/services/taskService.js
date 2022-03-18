import axios from "axios";
import {buildHeaders} from "../../utils/requestUtils";
import {getMe} from "../../discordJoinerStore/services/joinerServices/validateService";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const tasks = [];
export const logs = [];

export function clearLogs() {
    logs.length = 0;
}

export function stopTask() {

}

export async function launchBumperTask(bumperObj) {
    const {taskName, delay, channelList, messageList, token, deleteMessageObj} = bumperObj;
    const me = await getMe(token.token);

    if (!checkTaskExisting(taskName)) {
        const task = {
            name: taskName,
            successMessages: [],
            deleteParameters: deleteMessageObj.deleteDelay
        }
        tasks.push(task);

        if (deleteMessageObj.deleteDelay !== undefined)
            setInterval(deleteExpiredMessage, deleteMessageObj.deleteDelay, task);

        for (const message of messageList) {
            for (const channel of channelList) {
                const {status, messageId} = await sendMessage(me.email, token, channel, message);

                if (status) {
                    task.successMessages.push({message: message, messageId: messageId, channel: channel});
                    logs.push({message: message, channel: channel});
                }

                await sleep(delay);
            }
        }

        return {infoMessage: 'Task completed successfully'};
    } else {
        return {infoMessage: 'Task already exists'};
    }
}

async function sendMessage(email, token, channel, message) {
    let status;
    let messageId;

    await axios.post(`https://discord.com/api/v9/channels/${channel}/messages`, {
        content: message,
        nonce: 0,
        tts: false
    }, {
        headers: buildHeaders(token, email),
        withCredentials: true
    }).then((response) => {
        status = response.status;
        messageId = response.data.id;
    }).catch((e) => {
        status = e.response.status;
    });

    return {status: status === 200, messageId: messageId};
}

async function deleteExpiredMessage(task) {
    let message = task.successMessages[task.successMessages.length];

    let status;
    let flag = false;

    while (!flag) {
        try {
            axios.delete(`https://discord.com/api/v9/channels/${message.channel}/messages/${message.messageId}`)
                .then((response) => {
                    status = response.status;
                });

            flag = status === 204;
        } catch (e) {
            status = e.response.status;
            await sleep(500);
        }
    }

    return status === 204;
}

function checkTaskExisting(taskName) {
    for (const task of tasks) {
        if (taskName === task.taskName) {
            return true;
        }
    }

    return false;
}
