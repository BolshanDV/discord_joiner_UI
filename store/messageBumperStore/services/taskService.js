import axios from "axios";
import {buildHeaders} from "../../discordJoinerStore/utils/requestUtils";
import {getMe} from "../../discordJoinerStore/services/joinerServices/validateService";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const messages = {
    successMessages: [],
    deleteParameters: undefined
};

export async function launchBumperTask(bumperObj) {
    const {delay, channelList, messageList, token, deleteMessageObj} = bumperObj;
    setInterval(deleteExpiredMessage, deleteMessageObj.deleteDelay);

    const me = await getMe(token.token);

    {
        messages.successMessages = [];
        messages.deleteParameters = deleteMessageObj.deleteDelay
    }

    for (const message of messageList) {
        for (const channel of channelList) {
            const {status, messageId} = await sendMessage(me.email, token, channel, message);

            if (status) messages.successMessages.push({message: message, messageId: messageId, channel: channel});
            await sleep(delay);
        }
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

async function deleteExpiredMessage() {
    let message = messages.successMessages[messages.successMessages.length];

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