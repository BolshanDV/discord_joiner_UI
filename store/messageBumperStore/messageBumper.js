export const state = () => ({
    channelLists: [],
    messageList: []
})

export const getters = {
    channelLists: state => state.channelLists,
    messageList: state => state.messageList
}
export const mutations = {
    ADD_CHANNEL_TO_LISTS: (state, channelElement) => {
        if (channelElement !== '')state.channelLists.push(channelElement)
    },
    DELETE_CHANNEL: (state, index) => {
        state.channelLists.splice(index, 1)
    },
    ADD_MESSAGE_TO_LISTS: (state, massageItem) => {
        if (massageItem !== '') state.messageList.push(massageItem)
    },
    ADD_MESSAGE_ARR_TO_LISTS: (state, massageArr) => {
        if (massageArr.length !== 0 ) {
            massageArr.forEach(function (item) {
                state.messageList.push(item)
            })
        }
    },
    DELETE_MESSAGE: (state, index) => {
        state.messageList.splice(index, 1)
    },
}
export const actions = {
    DOWNLOADING_FILE: () => {
        alert('Возможно сделаем тут копирование')
    }
}


