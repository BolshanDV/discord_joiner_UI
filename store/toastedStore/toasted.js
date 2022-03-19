export const state = () => ({
    toasted: [],
    key: 0
})

export const getters = {
    toasted: state => state.toasted
}
export const mutations = {
    ADDING_ERROR: (state, item) => {
        switch (item.type) {
            case 'errorTokens': {
                let errorTokens = {
                    element: "The token failed validation:  " + item.data.substr(0, 15) + "...",
                    style: 'error',
                    id: state.key++
                }
                state.toasted.push(errorTokens)
                break;
            }
            case 'successTokens': {
                let successTokens = {
                    element: "Added tokens:  " + item.data.username.toUpperCase(),
                    style: 'success',
                    id: state.key++
                }
                state.toasted.push(successTokens)
                break;
            }
            case 'repeatTokens': {
                let successTokens = {
                    element: "Recurring token:  " + item.data.substr(0, 15) + "...",
                    style: 'warning',
                    id: state.key++
                }
                state.toasted.push(successTokens)
                break;
            }
            case 'startAllTasks': {
                let obj = {
                    element: "Start processing all tokens",
                    style: 'success',
                    id: state.key++
                }
                state.toasted.push(obj)
                break;
            }
            case 'stopAllTasks': {
                let obj = {
                    element: "Stop processing all tokens",
                    style: 'error',
                    id: state.key++
                }
                state.toasted.push(obj)
                break;
            }
            case 'createTask': {
                let obj = {
                    element: "Task successfully created",
                    style: 'success',
                    id: state.key++
                }
                state.toasted.push(obj)
                break;
            }
            case 'successErrorTokens': {
                let successTokensObj = {
                    element: "Quantity succeed joined accounts: " + item.successTokens.length,
                    style: 'success',
                    id: state.key++
                }
                let errorTokensObj = {
                    element: "Quantity unsucceed joined accounts: " + item.errorTokens.length,
                    style: 'error',
                    id: state.key++
                }
                state.toasted.push(successTokensObj)
                state.toasted.push(errorTokensObj)
                break;
            }
        }
    },
    DELETE_TOASTED: (state, index) => {
        state.toasted.splice(index, 1)
    }
}
export const actions = {
    ADDING_ERROR: (ctx, item) => {
        ctx.commit('ADDING_ERROR', item)
        let timerId = setInterval(() => {
            ctx.commit('DELETE_TOASTED', ctx.state.toasted.length - 1)
            if(ctx.state.toasted.length === 0) clearInterval(timerId);
        }, 4000)
    },
}
