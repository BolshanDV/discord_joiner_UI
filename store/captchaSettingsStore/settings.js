import {setCaptchaConfig} from "../discordJoinerStore/services/joinerServices/taskService";

export const state = () => ({
    capMonster: false,
    captcha2: false,
    captchaType: ''
})

export const getters = {
    capMonster: state => state.capMonster,
    captcha2: state => state.captcha2
}
export const mutations = {
    CHANGE_FLAG_CAPTCHA: (state, type) => {
        switch (type) {
            case '2captcha': {
                state.capMonster = false
                state.captcha2 = true
                break;
            }
            case 'capMonster': {
                state.capMonster = true
                state.captcha2 = false
                break;
            }
        }

    }
}
export const actions = {
    SAVE_KEY: (ctx, key) => {
        if(ctx.state.capMonster !== ctx.state.captcha2) {
            if(ctx.state.capMonster) {
                setCaptchaConfig('capmonster', key)
                console.log('capMonster')
            } else {
                setCaptchaConfig('2captcha', key)
                console.log('2captcha')
            }

        }
    }
}


