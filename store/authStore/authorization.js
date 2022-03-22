import {auth} from "./services/auth";
export const state = () => ({
    token: false
})

export const getters = {
    token: state => state.token
}
export const mutations = {
    SET_TOKEN: (state) => {
        state.token = true
    },
    CLEAR_TOKEN: (state) => {
        state.token = false
        console.log(state.token)
    }
}
export const actions = {
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
            ctx.commit('SET_TOKEN')
        }
    }
 }


