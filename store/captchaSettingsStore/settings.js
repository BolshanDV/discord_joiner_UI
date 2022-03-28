import {setCaptchaConfig} from "../discordJoinerStore/services/joinerServices/taskService";
// export let state = () => ({
//     tokens: [],
// })
export const actions = {
    SAVE_KEY: (ctx, key) => {
        setCaptchaConfig('capmonster', key)
    }
}


