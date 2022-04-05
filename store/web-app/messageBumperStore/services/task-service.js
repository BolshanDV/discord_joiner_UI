import axios from "axios";
import {buildHeaders} from "../../utils/requestUtils";
import {getMe} from "../../discordJoinerStore/services/joinerServices/validate-service";
import {logs} from "@/store/web-app/logger";
import {findTask} from "@/store/web-app/utils/taskUtils";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let criticalStopFlag = false;

export function setStopBumperCriticalFlag() {
    criticalStopFlag = true;
}

export function changeActiveFlag(taskName) {
    const task = findTask(tasks, taskName).task;
    task.isActive = !task.isActive;
}

const tasks = [];

export function getLoopIterationForSelectTask(taskName) {
    let loopIter = 0;
    tasks.forEach((task) => { if (task.taskName === taskName) loopIter = task.loopIteration });

    return loopIter;
}


export async function launchBumperTask(bumperObj) {
    const {taskName, delay, channelList, messageList, token, deleteMessageObj, loopMessageObj} = bumperObj;
    const me = await getMe(token);
    criticalStopFlag = false;
    const task = {
        taskName: taskName,
        successMessages: [],
        deleteParameters: deleteMessageObj.deleteDelay,
        token: token,
        email: me.email,
        loopIteration: 0,
        isActive: true
    }

    tasks.push(task);

    let intervalId;
    if (deleteMessageObj.active)
        intervalId = setInterval(deleteExpiredMessage, deleteMessageObj.deleteDelay, task);

    while (!criticalStopFlag) {
        for (const message of messageList) {
            if (criticalStopFlag) {
                tasks.length = 0;
                logs.push({type: 'JOINER', subtype: 'INFO', message: `All tasks will be stopped`});
                clearInterval(intervalId);
                break;
            }

            if (!task.isActive) {
                criticalStopFlag = true;
                logs.push({type: 'JOINER', subtype: 'INFO', message: `Task ${task.taskName} will be stopped`});
                break;
            }

            for (const channel of channelList) {
                if (criticalStopFlag) {
                    tasks.length = 0;
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

        task.loopIteration++;
        await sleep(loopMessageObj.deleteDelay);
    }

    return true;
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

