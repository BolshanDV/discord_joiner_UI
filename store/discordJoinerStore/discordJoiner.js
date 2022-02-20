import axios from "axios";
import {validateAndExtractTokens, validateSingleToken} from "./validateService";

export const state = () => ({
    tokens: [],
    errorToken: null,
    successJoined: [],
    globalStatus: false,
    dropDownMenuFlag: false,
})

export const getters = {
    tokens: state => state.tokens,
    dropDownMenuFlag: state => state.dropDownMenuFlag,
}
export const mutations = {
    SAVE_TOKENS: (state, tokens) => {
        state.tokens = tokens;
    },
    SAVE_ERROR_TOKEN: (state, token) => {
        state.errorToken = token;
    },
    SAVE_SINGLE_TOKEN: (state, token) => {
        if (token !== 0 ) state.tokens.push(token)
    },
    ADD_SUCCESS_TOKEN: (state, token) => {
        if ( token !== 0) state.successJoined.push(token);
    },
    SWITCH_GLOBAL_STATUS: (state, status) => {
        state.globalStatus = status;
    },
    DROP_DOWN_LIST_WITH_TOKEN: (state) => {
        state.dropDownMenuFlag = !state.dropDownMenuFlag
    },
    DELETE_TOKEN_FROM_LIST: (state, index) => {
        state.tokens.splice(index, 1)
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


