import {auth} from "./services/auth";

export const state = () => ({
    token: false

})

export const getters = {
    token: state => state.token
}
export const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = true
    },
    CLEAR_TOKEN: (state) => {
        state.token = null
    }
}
export const actions = {
    LOG_IN: (ctx, token) => {
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
        auth(token, resultHash)
    }
 }


