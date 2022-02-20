import axios from "axios";
import {validateAndExtractTokens, validateSingleToken} from "./validateService";

export const state = () => ({
    tokens: [],
    errorToken: null,
    successJoined: [],
    globalStatus: false,
    dropDownMenuFlagForToken: false,
    dropDownMenuFlagForProxy: false,
    proxyLists: []
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
        if ( tokens.length !== 0) tokens.forEach(function (item) {
                state.tokens.push(item)
            })
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
}
export const actions = {
    CREATE_TASK: async (ctx, parameters) => {
        const {inviteCode, tokens} = parameters;
        let errorToken = null;

        for (const token in tokens) {
            const status = await axios
                .post(`https://discord.com/api/v9/invites/${inviteCode}`, {}, {
                    withCredentials: true,
                    headers: {
                        'authorization': token
                    }
                }).then(response => {
                    return response.status;
                })

            if (status !== 200) {
                console.error(`Some error happened with token ${token}`);

                errorToken = token;

                break;
            } else {
                ctx.commit('ADD_SUCCESS_TOKEN', token);
            }
        }

        if (errorToken != null) {
            ctx.commit('SAVE_ERROR_TOKEN', errorToken);
            ctx.commit('SWITCH_GLOBAL_STATUS', false);

            return;
        }

        ctx.commit('SWITCH_GLOBAL_STATUS', true);
    },

    EXTRACT_AND_VALIDATE_TOKENS: async (ctx, tokens) => {
        const {input, errorToken} = await validateAndExtractTokens(tokens);

        (errorToken == null)
            ? ctx.commit('SAVE_ERROR_TOKEN', errorToken)
            : ctx.commit('SAVE_TOKENS', input);
    },

    VALIDATE_SINGLE_TOKEN: async (ctx, token) => {
        const {singleToken, errorToken} = validateSingleToken(token);

        (errorToken == null)
            ? ctx.commit('SAVE_ERROR_TOKEN', errorToken)
            : ctx.commit('SAVE_SINGLE_TOKEN', singleToken);
    }
}


