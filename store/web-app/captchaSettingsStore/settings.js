import {setCaptchaConfig} from "../discordJoinerStore/services/joinerServices/extended-task-service";

export const actions = {
    SAVE_KEY: (ctx, key) => {
        setCaptchaConfig('capmonster', key)
    }
}


