export const state = () => ({
    playStopFlag: true,
})

export const getters = {
    playStopFlag: state => state.playStopFlag
}
export const mutations = {
    CHANGE_PLAY_TO_STOP: (state) => {
        state.playStopFlag = !state.playStopFlag
    }
}
export const actions = {
    PAUSE_TASK: (ctx) => {
        ctx.commit('CHANGE_PLAY_TO_STOP')
    },

    PLAY: (ctx) => {
        ctx.commit('CHANGE_PLAY_TO_STOP')
    },
}


