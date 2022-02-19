import axios from "axios";

export const state = () => ({
    popUpFlag: false,
    tokens: [],
    errorToken: null,
    successJoined: [],
    globalStatus: false
})

export const getters = {
    popUpFlag: state => state.popUpFlag,
    tokens: state => state.tokens
}
export const mutations = {
    POPUP_DISPLAY: (state) => {
        state.popUpFlag = !state.popUpFlag
    },
    SAVE_TOKENS: (state, tokens) => {
        state.tokens = tokens;
    },
    SAVE_ERROR_TOKEN: (state, token) => {
        state.errorToken = token;
    },
    SAVE_SINGLE_TOKEN: (state, token) => {
        state.tokens.push(token)
    },
    ADD_SUCCESS_TOKEN: (state, token) => {
        state.successJoined.push(token);
    },
    SWITCH_GLOBAL_STATUS: (state, status) => {
        state.globalStatus = status;
    }

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
        let input = tokens.split(',');
        let errorToken = null;

        for (const token of input) {
            const status = await axios
                .get('https://discord.com/api/users/@me', {
                    withCredentials: true,
                    headers: {
                        'authorization': token
                    }
                }
            ).then(response => {
                return response.status;
                })

            if (status !== 200) {
                console.error(`Some error happened with token ${token}`);

                errorToken = token;
                input = null;

                break;
            }
        }

        if (input != null) {
            ctx.commit('SAVE_TOKENS', input);

            return;
        }

        ctx.commit('SAVE_ERROR_TOKEN', errorToken);
    },

    VALIDATE_SINGLE_TOKEN: async (ctx, token) => {
        let errorToken = null;

        const status = await axios
            .get('https://discord.com/api/users/@me', {
                    withCredentials: true,
                    headers: {
                        'authorization': token
                    }
                }
            )
            .then(response => {
                return response.status;
            })
            .catch(error => {
                console.log("There was an error!", error);
            }
    )

        if (status !== 200) {
            console.log(`Some error happened with token ${token}`);

            errorToken = token;
            ctx.commit('SAVE_ERROR_TOKEN', errorToken);

            return;
        }

        ctx.commit('SAVE_SINGLE_TOKEN', token);
    }
}


