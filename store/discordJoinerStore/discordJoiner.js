import {validateAndExtractTokens, validateSingleToken} from "./services/joinerServices/validateService";
import {getterTokens, launchTasks, setStartCriticalFlag} from "./services/joinerServices/taskService";
import {findTaskInMainArray} from "../utils/taskUtils";
import {converter} from "@/store/discordJoinerStore/services/joinerServices/textConverter";

export let state = () => ({
    tokens: [],
    errorTokens: [],
    globalStatus: false,
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
    proxyLists: state => state.proxyLists,
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
        console.log(tokens)
        if ( tokens.length !== 0) tokens.forEach(item => state.tokens.push(item))
    },
    SWITCH_GLOBAL_STATUS: (state, status) => {
        state.globalStatus = status;
    },
    DELETE_TOKEN_FROM_LIST: (state, index) => {
        state.tokens.splice(index, 1)
    },
    ADD_PROXY: (state, proxy) => {
        if(proxy !== '') state.proxyLists.push(proxy)
    },
    ADD_PROXY_FROM_ARR: (state, proxyArr) => {
        if( proxyArr.length !== 0) proxyArr.forEach(item => state.proxyLists.push(item))
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
            let repeat = false
            for (const element of ctx.state.taskStatus) {
                if (mainObj.taskName === element.taskName) {
                    repeat = true
                }
            }
            if (!repeat) {
                ctx.commit("SAVE_MAIN_DATA", mainObj)
            }
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
        }
    },

    START_ALL_TASKS:  (ctx, name) => {
        switch (name){
            case 'discordJoiner': {
                if (ctx.state.taskStatus.length !== 0) {
                    for (const taskStatusItem of ctx.state.taskStatus) {
                        ctx.dispatch('PLAY_TASK', taskStatusItem)
                    }
                }
                break;
            }
            case 'messageBumper': {
                ctx.dispatch('messageBumperStore/messageBumper/PlAY_ALL_TASK_MESSAGE_BUMPER', '', {root: true})
                break;
            }
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
    EXTRACT_AND_VALIDATE_TOKENS_FOR_DISCORD_JOINER: async (ctx, tokensText) => {
        let tokensObj = converter(tokensText)
        const {input, errorToken} = await validateAndExtractTokens(tokensObj);
        for (const inputElement of input) {
            let notRepeat = true
            for (const tokenItem of ctx.state.tokens) {
                if (inputElement.singleToken.token === tokenItem.token) {
                    notRepeat = false
                }
            }
            if (notRepeat) {
                ctx.commit('SAVE_SINGLE_TOKEN', inputElement.singleToken);
            }
        }
    },
    EXTRACT_AND_VALIDATE_PROXY: (ctx, proxyText) => {
        let proxyObj = converter(proxyText)
        for (const proxy of proxyObj) {
            ctx.commit('ADD_PROXY', proxy)
        }
    }
}


