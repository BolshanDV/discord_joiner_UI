import axios from "axios";

export const state = () => ({

})

export const getters = {
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
                ctx.dispatch('toastedStore/ADDING_ERROR', error.response, {root: true})
                console.log("There was an error!", error);
            });

    }
}
