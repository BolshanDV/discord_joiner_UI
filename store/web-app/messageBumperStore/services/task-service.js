import axios from "axios";
import {buildHeaders} from "../../utils/requestUtils";
import {getMe} from "../../discordJoinerStore/services/joinerServices/validate-service";
import {logs} from "@/store/web-app/logger";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export let loopIteration = 0;

let criticalStopFlag = false;

export function setStopBumperCriticalFlag() {
    criticalStopFlag = true;
}

export function setStartBumperCriticalFlag() {
    criticalStopFlag = false;
}

const tasks = [];

export async function launchBumperTask(bumperObj) {
    const {taskName, delay, channelList, messageList, token, deleteMessageObj, loopMessageObj} = bumperObj;
    const me = await getMe(token);

    if (!checkTaskExisting(taskName)) {
        let task = {
            name: taskName,
            successMessages: [],
            deleteParameters: deleteMessageObj.deleteDelay,
            token: token,
            email: me.email
        }
        tasks.push(task);

        let intervalId;
        if (deleteMessageObj.active)
            intervalId = setInterval(deleteExpiredMessage, deleteMessageObj.deleteDelay, task);

        while (loopMessageObj.active) {
            for (const message of messageList) {
                if (criticalStopFlag) {
                    tasks.length = 0;
                    task = null;
                    logs.push({type: 'JOINER', subtype: 'INFO', message: `All tasks will be stopped`});
                    clearInterval(intervalId);
                    break;
                }
                for (const channel of channelList) {
                    if (criticalStopFlag) {
                        tasks.length = 0;
                        task = null;
                        clearInterval(intervalId);
                        logs.push({type: 'JOINER', subtype: 'INFO', message: `All tasks will be stopped`});
                        break;
                    }

                    const {status, messageId} = await sendMessage(me.email, token, channel.channelId, message);

                    if (status) {
                        task.successMessages.push({message: message, messageId: messageId, channel: channel});
                        logs.push({
                            type: 'BUMPER',
                            subtype: 'INFO',
                            message: `Message "${message}" successfully sent in channel ${channel.channelId}`
                        });
                    } else {
                        logs.push({
                            type: 'BUMPER',
                            subtype: 'ERROR',
                            message: `An error occurred on the account ${me.username} while sending the message "${message}"`
                        });
                    }

                    await sleep(delay);
                }
            }

            loopIteration++;
            await sleep(loopMessageObj.deleteDelay);
        }

        return true;
    } else {
        return false;
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
    if (task.successMessages.length !== 0) {
        let message = task.successMessages[0];

        await axios.delete(`https://discord.com/api/v9/channels/${message.channel.channelId}/messages/${message.messageId}`, {
            headers: buildHeaders(task.token, task.email)
        })
            .then(() => {
            }).catch(e => {
                console.log(e);
            });

        logs.push({type: 'BUMPER', subtype: 'INFO', message: `Message "${task.successMessages[0].message}" deleted successfully`})
        task.successMessages.splice(0, 1);
    }
}

function checkTaskExisting(taskName) {
    for (const task of tasks) {
        if (taskName === task.taskName) {
            return true;
        }
    }

    return false;
}

