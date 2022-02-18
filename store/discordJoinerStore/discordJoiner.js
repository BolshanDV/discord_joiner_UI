import axios from "axios";

export const state = () => ({
    popUpFlag: false,
})

export const getters = {
    popUpFlag: state => state.popUpFlag,
}
export const mutations = {
    POPUP_DISPLAY: (state) => {
        state.popUpFlag = !state.popUpFlag
    }
}
export const actions = {
    CREATE_TASK: async (ctx, parameters) => {
        console.log(parameters)
        return await axios
            .post(`${parameters.taskName}`, {}, {
                withCredentials: true,
                headers:{
                    'authorization': parameters.accountsTokensList
                }
            })
            .then(response =>{
                console.log(response)
                }
            )
            .catch(error => {
                console.log("There was an error!", error);
            });
    },
    ADD_TOKENS: (ctx, tokens) => {
        console.log(tokens)
    }
}
