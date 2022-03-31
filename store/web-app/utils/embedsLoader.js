import {getMe} from "../discordJoinerStore/services/joinerServices/validate-service";
import axios from "axios";
import {buildHeaders} from "./requestUtils";

export async function getIconAndChannelName(channelObj) {
    const me = await getMe(channelObj.token);

    let channelName;
    let iconUrl;

    await axios.post(`https://discord.com/api/v9/channels/${channelObj.channelId}/invites`, {
        validate : null,
        max_age : 604800,
        max_uses : 0,
        target_type : null,
        temporary : false
    }, {
        headers: buildHeaders(channelObj.token, me.email),
        withCredentials: true
    }).then((response) => {
        channelName = response.data.channel.name;
        iconUrl = `https://cdn.discordapp.com/icons/${response.data.guild.id}/${response.data.guild.icon}.png`;
    }).catch((e) => console.log(e));

    return {
        channelName: channelName,
        iconUrl: iconUrl
    }
}
