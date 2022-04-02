import {validateAndExtractTokens} from "~/store/web-app/discordJoinerStore/services/joinerServices/validate-service";
import {
    startTaskAsynchronously,
    tasks
} from "~/store/web-app/discordJoinerFastModeStore/fastModeServices/simple-task-service";
import {findTaskInFastMode} from "@/store/web-app/utils/taskUtils";
import {logs} from "~/store/web-app/logger";

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
        console.log(obj.processTask.successAccounts)
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
    CREATE_TASK_AND_START: async (ctx, obj) => {
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
        let timerId
        ctx.dispatch('UPDATE_TOKENS_FAST_MODE', taskParameter.id).then((res) => {
            console.log(res)
            timerId = res
        })
        ctx.commit('SAVE_TASK', taskParameter)
        let result = await startTaskAsynchronously(taskParameter)
        console.log(result)
        if (result) {
            ctx.dispatch('COMPLETED_TASK', {
                id: taskParameter.id,
                timerId: timerId
            });
        } else {
            ctx.commit('ERROR_TASK', taskParameter.id)
        }
    },

    DELETE_TASK_ELEMENT: (ctx, index) => {
        ctx.commit('DELETE_TASK', index)
    },

    UPDATE_TOKENS_FAST_MODE: (ctx, id) => {
        return setInterval(() => {
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

    COMPLETED_TASK: (ctx, mainObj) => {
        let obj = {
            id: findTaskInFastMode(ctx.state.taskFastMode, mainObj.id),
            processTask: {
                successAccounts: "done",
                style: 'success'
            }
        }
        setTimeout(() => {
            clearInterval(mainObj.timerId)
            obj.processTask.successAccounts = tasks[findTaskInFastMode(tasks, mainObj.id)].successAccounts
            ctx.commit('UPDATE_TOKENS_AND_SAVE', obj)
        }, 1000)
    },

    ERROR_TASK: (ctx, id) => {
        ctx.commit('UPDATE_TOKENS_AND_SAVE', {
            id: findTaskInFastMode(ctx.state.taskFastMode, id),
            processTask: {
                successAccounts: "Failed",
                style: 'success'
            }
        })

    }
}


