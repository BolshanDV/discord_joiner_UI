import {validateAndExtractTokens} from "~/store/web-app/discordJoinerStore/services/joinerServices/validate-service";
import {
    startTaskAsynchronously,
    tasks
} from "~/store/web-app/discordJoinerFastModeStore/fastModeServices/simple-task-service";
import {findTaskInFastMode} from "@/store/web-app/utils/taskUtils";

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
    },
    DELETE_TASK: (state, index) => {
        state.taskFastMode.splice(index, 1)
    },
    UPDATE_TOKENS_AND_SAVE: (state, obj) => {
        state.taskFastMode[obj.id].processTask = obj.processTask
    }
}

export const actions = {
    EXTRACT_AND_VALIDATE_TOKENS: async (ctx, tokensArr) => {
        const {input} = await validateAndExtractTokens(tokensArr);
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
    CREATE_TASK_AND_START:  (ctx, obj) => {
        const taskParameter = {
            id: Date.now(),
            inviteCode: obj.inviteCode,
            tokens: obj.accountToken,
            proxies: obj.proxy,
            delay: obj.delay,
            processTask: {
                successAccounts: 0,
                style: ''
            }
        }
        startTaskAsynchronously(taskParameter).then((result) => {
            if (result) {
                ctx.dispatch('COMPLETED_TASK', taskParameter.id);
            }
        })

        ctx.commit('SAVE_TASK', taskParameter)
        ctx.dispatch('UPDATE_TOKENS_FAST_MODE', taskParameter.id)
    },

    DELETE_TASK_ELEMENT: (ctx, index) => {
        ctx.commit('DELETE_TASK', index)
    },

    UPDATE_TOKENS_FAST_MODE: (ctx, id) => {
        let timerId = setInterval(() => {
                let obj = {
                    id: findTaskInFastMode(ctx.state.taskFastMode, id),
                    processTask: {
                        successAccounts: tasks[findTaskInFastMode(tasks, id)].successAccounts,
                        style: ''
                    }
                }
                ctx.commit('UPDATE_TOKENS_AND_SAVE', obj)
            },
            10)
    },
    COMPLETED_TASK: (ctx, id) => {
        console.log('hi')
        let obj = {
            id: findTaskInFastMode(ctx.state.taskFastMode, id),
            processTask: {
                successAccounts: "Done",
                style: 'success'
            }
        }
        ctx.commit('UPDATE_TOKENS_AND_SAVE', obj)
    }
}


