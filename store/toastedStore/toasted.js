export const state = () => ({
    toasted: []
})

export const getters = {
    toasted: state => state.toasted
}
export const mutations = {
    ADDING_ERROR: (state, item) => {
        state.toasted.push(item)
    },
    DELETE_TOASTED: (state, index) => {
        state.toasted.splice(index, 1)
    }
}
