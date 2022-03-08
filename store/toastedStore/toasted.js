export const state = () => ({
    toasted: [],
    key: 0
})

export const getters = {
    toasted: state => state.toasted
}
export const mutations = {
    ADDING_ERROR: (state, item) => {
        if(item.type === 'errorTokens') {
            let errorTokens = {
                element: "The token failed validation:  " + item.data.substr(0, 15) + "...",
                style: 'error',
                id: state.key++
            }
            state.toasted.push(errorTokens)
        } else if (item.type === 'successTokens') {
            let successTokens = {
                element: "Added tokens:  " + item.data.username.toUpperCase(),
                style: 'success',
                id: state.key++
            }
            state.toasted.push(successTokens)
        } else if (item.type === 'repeatTokens'){
            let successTokens = {
                element: "Recurring token:  " + item.data.substr(0, 15) + "...",
                style: 'warning',
                id: state.key++
            }
            state.toasted.push(successTokens)
        }
        else {
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

        }

    },
    DELETE_TOASTED: (state, index) => {
        state.toasted.splice(index, 1)
        console.log(state.toasted)
    }
}
export const actions = {
    ADDING_ERROR: (ctx, item) => {
        console.log(item)
        ctx.commit('ADDING_ERROR', item)
        let timerId = setInterval(() => {
            ctx.commit('DELETE_TOASTED', ctx.state.toasted.length - 1)
            if(ctx.state.toasted.length === 0) clearInterval(timerId);
        }, 4000)
    },
}
