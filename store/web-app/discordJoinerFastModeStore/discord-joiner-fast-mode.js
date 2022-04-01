import {validateAndExtractTokens} from "~/store/web-app/discordJoinerStore/services/joinerServices/validate-service";
import {startTaskAsynchronously} from "~/store/web-app/discordJoinerFastModeStore/fastModeServices/simple-task-service";

export let state = () => ({
    accountToken: [],
    proxy: [],
    taskFastMode: [],
})

export const getters = {
    accountToken: state => state.accountToken,
    proxy: state => state.proxy,
    taskFastMode: state => state.taskFastMode,
}

export const mutations = {
    SAVE_TOKEN: (state, token) => {
        state.accountToken.push(token)
    },
    DELETE_TOKEN: (state, index) => {
        state.accountToken.splice(index, 1)
    },
    SAVE_PROXY_TO_ARR: (state, proxy) => {
        console.log(proxy)
        state.proxy.push(proxy)
    },
    DELETE_PROXY: (state, index) => {
        state.proxy.splice(index, 1)
    },
    SAVE_TASK: (state, obj) => {
        state.taskFastMode.push(obj)
        console.log('SAVED');
    },
    DELETE_TASK: (state, index) => {
        state.taskFastMode.splice(index, 1)
    }
}

export const actions = {
    EXTRACT_AND_VALIDATE_TOKENS: async (ctx, tokensArr) => {
        const {input, errorToken} = await validateAndExtractTokens(tokensArr);
        for (const inputElement of input) {
            let notRepeat = true
            for (const tokenItem of ctx.state.accountToken) {
                if (inputElement.singleToken.token === tokenItem.token) {
                    notRepeat = false
                }
            }
            if (notRepeat) {
                ctx.commit('SAVE_TOKEN', inputElement.singleToken);
            }
        }
    },

    SAVE_PROXY: (ctx, proxyArr) => {
        for (const proxyItem of proxyArr) {
            if (proxyItem !== "") {
                ctx.commit('SAVE_PROXY_TO_ARR', proxyItem)
            }
        }
    },
    CREATE_TASK_AND_START: (ctx, obj) => {
        const taskParameter = {
            inviteCode: obj.inviteCode,
            tokens: obj.accountToken,
            proxies: obj.proxy
        };

        startTaskAsynchronously(taskParameter).then(() => console.log('Task completed successfully'));
        ctx.commit('SAVE_TASK', taskParameter);
    },
    DELETE_TASK_ELEMENT: (ctx, index) => {
        ctx.commit('DELETE_TASK', index)
    }
}


