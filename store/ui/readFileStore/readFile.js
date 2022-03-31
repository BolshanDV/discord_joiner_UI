import {converter} from "@/store/discordJoinerStore/services/joinerServices/text-converter";

export const actions = {
    FILE_READ_MESSAGES: async (ctx, file) => {
        let blob  = file.target.files[0];
        let reader = new FileReader();
        reader.readAsText(blob, 'UTF-8');
        reader.onload = () => {
            const res = converter(reader.result);
            ctx.commit(`messageBumperStore/message-bumper.js/ADD_MESSAGE_TO_LISTS`, res, {root: true});
            reader = null;
        }
    },
    READ_FILE_TOKENS: async (ctx, file) => {
        let blob  = file.target.files[0];
        let reader = new FileReader();
        reader.readAsText(blob, 'UTF-8');
        reader.onload = () => {
            const res = reader.result
            ctx.dispatch(`discordJoinerStore/discord-joiner.js/EXTRACT_AND_VALIDATE_TOKENS_FOR_DISCORD_JOINER`, res, {root: true});
            reader = null;
        }
    },
    READ_FILE_PROXY: async (ctx, file) => {
        let blob  = file.target.files[0];
        let reader = new FileReader();
        reader.readAsText(blob, 'UTF-8');
        reader.onload = () => {
            const res = reader.result.split('\n');
            console.log(res)
            ctx.commit('discordJoinerStore/discord-joiner.js/ADD_PROXY_FROM_ARR', res, {root: true})
            reader = null;
        }
    }
 }
