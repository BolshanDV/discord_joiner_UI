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
                ctx.dispatch('discordJoinerStore/discordJoiner/EXTRACT_AND_VALIDATE_TOKENS', {data: text, type: "Message Bumper"} , {root: true})
                break;
            }
            case "Accounts tokens list Discord Joiner": {
                ctx.dispatch('discordJoinerStore/discordJoiner/EXTRACT_AND_VALIDATE_TOKENS', {data: text, type: "Discord Joiner"}, {root: true})
                break;
            }
            case "Proxy list": {
                ctx.commit('discordJoinerStore/discordJoiner/ADD_PROXY_FROM_ARR', {data: text, type: "Proxy list"}, {root: true})
                break;
            }
            case "Choose captcha service": {
                console.log('hi')
                break;
            }
        }
        ctx.commit('POPUP_DISPLAY', "")
    }
}


