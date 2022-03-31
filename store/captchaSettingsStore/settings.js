import {setCaptchaConfig} from "../discordJoinerStore/services/joinerServices/taskService";

export const actions = {
    SAVE_KEY: (ctx, key) => {
        setCaptchaConfig('capmonster', key)
    }
}


