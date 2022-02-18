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
    EXTRACT_AND_VALIDATE_TOKENS: async (ctx, tokens) => {
        const input = tokens.split(',');

        for (const token of input) {
            const status = await axios
                .get('https://discord.com/api/users/@me', {
                    withCredentials: true,
                    headers: {
                        'authorization': token
                    }
                }
            ).then(response => {
                return response.status;
                })

            if (status !== 200) {
                console.error(`Some error happened with token ${token}`);

                break;
            }
        }
    }
}
