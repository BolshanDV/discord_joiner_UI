import {validateAndExtractTokens, validateSingleToken} from "./services/validateService";
import {joinChannel} from "./services/taskService";

export const state = () => ({
    tokens: [],
    errorToken: null,
    successJoined: [],
    globalStatus: false,
    dropDownMenuFlagForToken: false,
    dropDownMenuFlagForProxy: false,
    proxyLists: [],
    delay: 0,
    reactionClickerObj: {},
    sendCommand: {}
})

export const getters = {
    tokens: state => state.tokens,
    dropDownMenuFlagForToken: state => state.dropDownMenuFlagForToken,
    proxyLists: state => state.proxyLists,
    dropDownMenuFlagForProxy: state => state.dropDownMenuFlagForProxy
}
export const mutations = {
    SAVE_TOKENS: (state, tokens) => {
        state.tokens = tokens;
    },
    SAVE_ERROR_TOKEN: (state, token) => {
        state.errorToken = token;
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
        state.sendCommand = obj
    }
}
export const actions = {
    CREATE_SIMPLE_TASK: async (ctx, parameters) => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        const {inviteCode, tokens, delay} = parameters;

        console.log(delay);

        for (const token of tokens) {
            const {successToken, errorToken} = await joinChannel(inviteCode, token);

            if (errorToken !== undefined) {
                ctx.commit('SAVE_ERROR_TOKEN', errorToken);
                ctx.commit('SWITCH_GLOBAL_STATUS', false);

                return;
            } else {
                const userObj = { username: tokens.username, token: successToken }

                ctx.commit('ADD_SUCCESS_TOKEN', userObj);
            }

            await sleep(delay);
        }

        ctx.commit('SWITCH_GLOBAL_STATUS', true);
    },


    EXTRACT_AND_VALIDATE_TOKENS: async (ctx, tokens) => {
        const {input, errorToken} = await validateAndExtractTokens(tokens);

        (errorToken !== undefined)
            ? ctx.commit('SAVE_ERROR_TOKEN', errorToken)
            : ctx.commit('SAVE_TOKENS', input);
    },

    VALIDATE_SINGLE_TOKEN: async (ctx, token) => {
        const {singleToken, errorToken} = await validateSingleToken(token);

        (errorToken !== undefined)
            ? ctx.commit('SAVE_ERROR_TOKEN', errorToken)
            : ctx.commit('SAVE_SINGLE_TOKEN', singleToken);
    }
}


