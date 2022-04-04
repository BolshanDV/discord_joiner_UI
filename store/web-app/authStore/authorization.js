import {auth, check, setCheck} from "./services/auth";
export const state = () => ({
    token: localStorage['licenseKey'] ? localStorage['licenseKey'] : false,
    stopCheck: null
})

export const getters = {
    token: state => state.token
}
export const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = true
        localStorage['licenseKey'] = token.toString()
    },
    CLEAR_TOKEN: (state) => {
        clearInterval(state.stopCheck)
        state.token = false
        localStorage.clear()
    },

    STOP_CHECK: (state, id) => {
        state.stopCheck = id
    }
}
export const actions = {
    CLEAR: (ctx) => {
        ctx.commit('CLEAR_TOKEN')
    },

    LOG_IN: async (ctx, token) => {
        let resultHash = {
            hardwareConcurrency: navigator.hardwareConcurrency,
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth,
            appVersion: navigator.appVersion,
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            platform: navigator.platform
        }

        let res = await auth(token, resultHash)

        if (res) {
            setCheck();
            ctx.commit('SET_TOKEN', token)
            ctx.dispatch('CHEK_TOKEN', token)
        }
    },

    CHEK_TOKEN: (ctx, token) => {
        let id = setInterval(() => {
            if(check) {
                ctx.commit('CLEAR_TOKEN')
            } else {
                ctx.commit('SET_TOKEN', token)
            }
        }, 1000)
        ctx.commit('STOP_CHECK', id)
    }
 }


