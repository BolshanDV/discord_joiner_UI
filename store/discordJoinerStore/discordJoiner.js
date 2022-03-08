import {validateAndExtractTokens, validateSingleToken} from "./services/joinerServices/validateService";
import {getterTokens, launchTasks} from "./services/joinerServices/taskService";
import {findTaskInMainArray} from "./utils/taskUtils";

// TODO Перенести GuildID в Accept Rules module                                                                         //DONE
// TODO Если токен не прошел проверку (не 200 статус ответа) -> отобразить ошибку на стороне фронтенда
// TODO Добавить в Message Bumper функцию валидации токенов (VALIDATE_SINGLE_TOKEN and EXTRACT_AND_VALIDATE_TOKENS)
// TODO Добавить функцию удаления таска при нажатии соответствующей кнопки
// TODO создать соответствующий объект для передачи мне в функцию всех полей из Message Bumper
// TODO связать кнопку паузы с написанною мною функцией (PAUSE_TASK)

export const state = () => ({
    tokens: [],
    mainData: [],
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

})

export const getters = {
    tokens: state => state.tokens,
    dropDownMenuFlagForToken: state => state.dropDownMenuFlagForToken,
    proxyLists: state => state.proxyLists,
    dropDownMenuFlagForProxy: state => state.dropDownMenuFlagForProxy,
    selectedSendCommand: state => state.selectedSendCommand,
    selectedReactionClicker: state => state.selectedReactionClicker,
    accept_rules: state => state.accept_rules,
    mainData: state => state.mainData,
    successTokens: state => state.successTokens,
    renderKey: state => state.renderKey,
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
        state.mainData.push(obj)
    },
    UPDATE_TOKENS_AND_SAVE: (state, obj) => {
        console.log(obj)
        state.successTokens[obj.id] = obj.processedTokens.successTokens.length
        state.renderKey++
        console.log(state.successTokens)
    }
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
            accept_rules: ctx.state.accept_rules
        }
        ctx.commit("SAVE_MAIN_DATA", mainObj)

        if (inviteCode !== undefined && tokens.length !==0) {
            const {successTokens, errorTokens} = await launchTasks(mainObj);
            ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {successTokens, errorTokens}, {root: true})
        }
    },

    EXTRACT_AND_VALIDATE_TOKENS: async (ctx, tokens) => {
        const {input, errorToken} = await validateAndExtractTokens(tokens);

        (errorToken !== undefined)
            ? ctx.commit('SAVE_ERROR_TOKEN', errorToken)
            : ctx.commit('SAVE_TOKENS', input);
    },

    VALIDATE_SINGLE_TOKEN: async (ctx, token) => {
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

    UPDATE_TOKENS: (ctx, taskName) => {
        // state.mainData[findTaskInMainArray(state.mainData, taskName)].processedTokens = getterTokens(taskName);
        let obj = {
            id: findTaskInMainArray(ctx.state.mainData, taskName),
            processedTokens: getterTokens(taskName)
            // processedTokens: "n"
        }
        ctx.commit('UPDATE_TOKENS_AND_SAVE', obj)
    },

    PAUSE_TASK: (ctx, taskName) => {

    }
}


