export const state = () => ({
    popUpFlag: false,
    namePopUp: ''
})

export const getters = {
    popUpFlag: state => state.popUpFlag,
    namePopUp: state => state.namePopUp
}
export const mutations = {
    POPUP_DISPLAY: (state, name) => {
        state.popUpFlag = !state.popUpFlag
        state.namePopUp = name
    },

}
export const actions = {
    EXTRACT_AND_VALIDATE: (ctx, text) => {
        text.split(' ')
        switch (ctx.state.namePopUp) {
            case "Message list 2": {
                ctx.commit('messageBumperStore/messageBumper/ADD_MESSAGE_ARR_TO_LISTS', text.split(' '), {root: true})
                break;
            }
            case "Accounts tokens list Discord Joiner": {
                ctx.commit('discordJoinerStore/discordJoiner/ADD_SUCCESS_TOKENS_ARR', text.split(' '), {root: true})
                break;
            }
            case "Proxy list": {
                ctx.commit('')
            }
        }
        ctx.commit('POPUP_DISPLAY', "")
    }
}


