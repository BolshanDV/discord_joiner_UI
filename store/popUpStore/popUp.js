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

}


