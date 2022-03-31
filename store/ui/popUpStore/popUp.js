export const state = () => ({
    popUpFlag: false,
    namePopUp: '',
})

export const getters = {
    popUpFlag: state => state.popUpFlag,
    namePopUp: state => state.namePopUp,
}
export const mutations = {
    POPUP_DISPLAY: (state, name) => {
            state.popUpFlag = !state.popUpFlag
            state.namePopUp = name
    },
}
export const actions = {
    EXTRACT_AND_VALIDATE: (ctx, text) => {
        text = [...new Set(text.split('\n'))]
        switch (ctx.state.namePopUp) {
            case "Accounts tokens list Message Bumper": {
                ctx.dispatch('discordJoinerStore/discord-joiner.js/EXTRACT_AND_VALIDATE_TOKENS', {data: text, type: "Message Bumper"} , {root: true})
                break;
            }
            case "Accounts tokens Discord Joiner": {
                ctx.dispatch('discordJoinerStore/discord-joiner.js/EXTRACT_AND_VALIDATE_TOKENS', {data: text, type: "Discord Joiner"}, {root: true})
                break;
            }
            case "Proxy list": {
                ctx.commit('discordJoinerStore/discord-joiner.js/ADD_PROXY_FROM_ARR', text, {root: true})
                break;
            }
        }
        ctx.commit('POPUP_DISPLAY', "")
    }
}


