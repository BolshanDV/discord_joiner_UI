import {setCaptchaConfig} from "../discordJoinerStore/services/joinerServices/taskService";
import {app} from "~/server/app";

export const actions = {
    SAVE_KEY: (ctx, key) => {
        app.listen(3030, () => {
            console.log(`Example app listening on port ${3030}`)
        })

        setCaptchaConfig('capmonster', key)
    }
}


