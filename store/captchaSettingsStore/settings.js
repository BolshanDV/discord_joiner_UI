import {setCaptchaConfig} from "../discordJoinerStore/services/joinerServices/extendedTaskService";
// export let state = () => ({
//     tokens: [],
// })
export const actions = {
    SAVE_KEY: (ctx, key) => {
        setCaptchaConfig('capmonster', key)
    }
}


