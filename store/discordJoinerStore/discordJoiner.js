import {validateAndExtractTokens, validateSingleToken} from "./services/joinerServices/validateService";
import {getterTokens, launchTasks, setStartCriticalFlag} from "./services/joinerServices/taskService";
import {findTaskInMainArray} from "../utils/taskUtils";

export let state = () => ({
    tokens: [],
    errorTokens: [],
    globalStatus: false,
    dropDownMenuFlagForToken: false,
    dropDownMenuFlagForProxy: false,
    dropDownMenuFlagForGuildID: false,
    proxyLists: [],
    delay: 0,
    reactionClickerObj: {},
    sendCommandObj: {},
    selectedSendCommand: false,
    selectedReactionClicker: false,
    accept_rules: false,
    renderKey: 0,
    successTokens: [],
    taskStatus: []
})

export const getters = {
    tokens: state => state.tokens,
    dropDownMenuFlagForToken: state => state.dropDownMenuFlagForToken,
    proxyLists: state => state.proxyLists,
    dropDownMenuFlagForProxy: state => state.dropDownMenuFlagForProxy,
    selectedSendCommand: state => state.selectedSendCommand,
    selectedReactionClicker: state => state.selectedReactionClicker,
    accept_rules: state => state.accept_rules,
    successTokens: state => state.successTokens,
    renderKey: state => state.renderKey,
    taskStatus: state => state.taskStatus
}
export const mutations = {
    SAVE_TOKENS: (state, tokens) => {
        state.tokens = tokens;
    },
    SAVE_ERROR_TOKEN: ({state, ctx}, token) => {
        state.errorTokens.push(token);
        let obj = {
            type: "errorTokens",
            data:  ctx.state.errorTokens
        }
        ctx.dispatch('toastedStore/toasted/ADDING_ERROR', obj, {root: true})
    },
    SAVE_SINGLE_TOKEN: (state, token) => {
        if ( token !== 0 ) state.tokens.push(token)
    },
    ADD_SUCCESS_TOKEN: (state, token) => {
        if ( token !== 0) state.successJoined.push(token);
    },
    ADD_SUCCESS_TOKENS_ARR: (state, tokens) => {
        if ( tokens.length !== 0) tokens.forEach(item => state.tokens.push(item))
    },
    SWITCH_GLOBAL_STATUS: (state, status) => {
        state.globalStatus = status;
    },
    DROP_DOWN_LIST_WITH_TOKEN: (state) => {
        state.dropDownMenuFlagForToken = !state.dropDownMenuFlagForToken
    },
    DELETE_TOKEN_FROM_LIST: (state, index) => {
        state.tokens.splice(index, 1)
    },
    ADD_PROXY: (state, proxy) => {
        if(proxy !== '' && proxy !== ' ') state.proxyLists.push(proxy)
    },
    ADD_PROXY_FROM_ARR: (state, proxyArr) => {
        if( proxyArr.length !== 0) proxyArr.forEach(function (item) {
            state.proxyLists.push(item)
        })
    },
    DROP_DOWN_LIST_WITH_PROXY: (state) => {
        state.dropDownMenuFlagForProxy = !state.dropDownMenuFlagForProxy
    },
    DELETE_PROXY_FROM_LIST: (state, index) => {
        state.proxyLists.splice(index, 1)
    },
    SAVE_DATA_FROM_R_CLICKER: (state, obj) => {
        state.reactionClickerObj = obj
    },
    SAVE_DATA_FROM_S_COMMAND: (state, obj) => {
        state.sendCommandObj = obj
    },
    CHANGE_CHECKBOX_REACTION_CLICKER: (state) => {
        state.selectedReactionClicker = !state.selectedReactionClicker
    },
    CHANGE_CHECKBOX_SEND_COMMAND: (state) => {
        state.selectedSendCommand = !state.selectedSendCommand
    },
    CHANGE_CHECKBOX_ACCEPT_RULES: (state) => {
        state.accept_rules = !state.accept_rules
    },
    SAVE_MAIN_DATA: (state, obj) => {
        state.taskStatus.push(obj)
        state.selectedReactionClicker = false
        state.selectedSendCommand = false
        state.reactionClickerObj = {}
        state.sendCommandObj = {}
        state.accept_rules = false
        state.tokens = []
    },
    UPDATE_TOKENS_AND_SAVE: (state, obj) => {
        if(obj.processedTokens.length === 0 ) {
            state.successTokens[obj.id] = 0
        } else {
            state.successTokens[obj.id] = obj.processedTokens.successTokens.length
        }
        state.renderKey++
    },
    DELETE_TASK_STATUS: (state, index) => {
        state.taskStatus.splice(index, 1)
        state.successTokens.splice(index, 1)
    },

    CHANGE_PROCESSING_FLAG: (state, obj) =>  {
        state.taskStatus[obj.id].processingTask = obj.text
    },

}
export const actions = {
    // Function with minimal functionality
    // The point is only to sequentially call functions along the chain to achieve the final verification
    CREATE_TASK: async (ctx, parameters) => {
        // We receive fields from the client, perform minimal validations and pass them to the task launch function
        const {inviteCode, tokens, delay, guildId, taskName} = parameters;
        let mainObj = {
            tokens: tokens,
            inviteCode: inviteCode,
            delay: delay,
            guildId: guildId,
            taskName: taskName,
            reactionClickerFlag: ctx.state.selectedReactionClicker,
            sendCommandFlag: ctx.state.selectedSendCommand,
            reactionClickerObj:  ctx.state.reactionClickerObj,
            sendCommandObj: ctx.state.sendCommandObj,
            accept_rules: ctx.state.accept_rules,
            processingTask: ''
        }

        if (inviteCode !== undefined && tokens.length !== 0 && taskName!== '') {
            ctx.commit("SAVE_MAIN_DATA", mainObj)
            ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {
                    type: 'createTask'
                },
                {root: true}
            )
        }
    },

    PLAY_TASK: async (ctx, mainObj) => {
        setStartCriticalFlag()
        let index = findTaskInMainArray(ctx.state.taskStatus, mainObj.taskName)
        ctx.commit('CHANGE_PROCESSING_FLAG', {id: index, text: "startProcess"})
        if (mainObj.inviteCode !== undefined && mainObj.tokens.length !== 0) {
            ctx.dispatch('UPDATE_TOKENS', mainObj.taskName)
            const {successTokens, errorTokens} = await launchTasks(mainObj);
            ctx.commit('CHANGE_PROCESSING_FLAG', {id: index, text: "done"})
            ctx.dispatch('toastedStore/toasted/ADDING_ERROR',
                {
                    successTokens: successTokens,
                    errorTokens: errorTokens,
                    type: 'successErrorTokens'
                },

                {root: true}
            )
        }
    },

    START_ALL_TASKS:  (ctx) => {
        ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {
                type: 'startAllTasks'
            },
            {root: true}
        )
        for (const taskStatusItem of ctx.state.taskStatus) {
            ctx.dispatch('PLAY_TASK', taskStatusItem)
        }
    },

    EXTRACT_AND_VALIDATE_TOKENS: async (ctx, tokensObj) => {
        if (tokensObj.type === 'Discord Joiner') await ctx.dispatch('EXTRACT_AND_VALIDATE_TOKENS_FOR_DISCORD_JOINER', tokensObj.data)
        if (tokensObj.type === 'Message Bumper') await ctx.dispatch('messageBumperStore/messageBumper/EXTRACT_AND_VALIDATE_TOKENS_FOR_MASSAGER_BUMPER', tokensObj.data, {root: true})
        if (tokensObj.type === 'Proxy list') console.log("Proxy list")
    },

    VALIDATE_SINGLE_TOKEN: async (ctx, tokenObj) => {
        (tokenObj.name === 'discordJoiner')
            ? ctx.dispatch('VALIDATE_SINGLE_TOKEN_FOR_DISCORD_JOINER', tokenObj.token)
            : ctx.dispatch('messageBumperStore/messageBumper/VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER', tokenObj.token, {root: true})
    },
    UPDATE_TOKENS: (ctx, taskName) => {
        let timerId = setInterval(() => {
                let obj = {
                    id: findTaskInMainArray(ctx.state.taskStatus, taskName),
                    processedTokens: getterTokens(taskName)
                }
                ctx.commit('UPDATE_TOKENS_AND_SAVE', obj)
            }
            , 4000)
    },

    VALIDATE_SINGLE_TOKEN_FOR_DISCORD_JOINER: async (ctx, token) => {
        let notRepeat = true
        for (const tokenItem of ctx.state.tokens) {
            if(tokenItem.token === token) {
                notRepeat = false
                ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "repeatTokens", data: token}, {root: true})
            }
        }
        if (notRepeat){
            const result = await validateSingleToken(token);

            if (result.errorToken !== undefined) {
                ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "errorTokens", data:  result.errorToken}, {root: true})
            } else {
                ctx.commit('SAVE_SINGLE_TOKEN', result.singleToken);
                ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "successTokens", data:  result.singleToken}, {root: true})
            }
        }
    },
    EXTRACT_AND_VALIDATE_TOKENS_FOR_DISCORD_JOINER: async (ctx, tokensObj) => {
        for (const tokensElement of tokensObj) {
            for (const tokenItem of ctx.state.tokens) {
                if (tokensElement === tokenItem.token) {
                    ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "repeatTokens", data: tokensElement}, {root: true})
                }
            }
        }
        const {input, errorToken} = await validateAndExtractTokens(tokensObj);
        for (const inputElement of input) {
            let notRepeat = true
            for (const tokenItem of ctx.state.tokens) {
                if (inputElement.singleToken.token === tokenItem.token) {
                    notRepeat = false
                }
            }
            if (notRepeat) {
                if (inputElement.errorToken !== undefined) {
                    ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "errorTokens", data:  inputElement.errorToken}, {root: true})
                } else {
                    ctx.commit('SAVE_SINGLE_TOKEN', inputElement.singleToken);
                    ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "successTokens", data:  inputElement.singleToken}, {root: true})
                }
            }
        }
    }
}


