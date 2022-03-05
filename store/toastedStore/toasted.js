export const state = () => ({
    toasted: []
})

export const getters = {
    toasted: state => state.toasted
}
export const mutations = {
    ADDING_ERROR: (state, item) => {
        state.toasted.push(item)
        if(state.toasted.length) {
            setTimeout(() => {
                state.toasted.splice( 0, 1)
            }, 6000)
        }
    },
    DELETE_TOASTED: (state, index) => {
        state.toasted.splice(index, 1)
    }
}
export const actions = {

}
