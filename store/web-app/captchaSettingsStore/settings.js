import {setCaptchaConfig} from "../discordJoinerStore/services/joinerServices/extended-task-service";

export const actions = {
    SAVE_KEY: (ctx, key) => {
        if (localStorage['capMonster']) key = localStorage['capMonster']
        setCaptchaConfig('capmonster', key)
        localStorage['capMonster'] = key.toString()
    }
}


