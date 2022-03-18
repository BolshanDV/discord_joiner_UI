import {
    getMe,
    validateAndExtractTokens,
    validateSingleToken
} from "../discordJoinerStore/services/joinerServices/validateService";
import {launchBumperTask} from "./services/taskService";
import axios from "axios";
import {buildHeaders} from "../discordJoinerStore/utils/requestUtils";

export const state = () => ({
    channelList: [],
    messageList: [],
    dropDownFlagForAccountListMBumper: false,
    tokensList: [],
    deleteMessagesFlag: false
})

export const getters = {
    channelList: state => state.channelList,
    messageList: state => state.messageList,
    dropDownFlagForAccountListMBumper: state => state.dropDownFlagForAccountListMBumper,
    tokensList: state => state.tokensList,
    deleteMessagesFlag: state => state.deleteMessagesFlag
}
export const mutations = {
    ADD_CHANNEL_TO_LISTS: (state, channelElement) => {
        if (channelElement !== '')state.channelList.push(channelElement)
    },
    DELETE_CHANNEL: (state, index) => {
        state.channelList.splice(index, 1)
    },
    ADD_MESSAGE_TO_LISTS: (state, massageItem) => {
        if (massageItem !== '') state.messageList.push(massageItem)
    },
    ADD_MESSAGE_ARR_TO_LISTS: (state, massageArr) => {
        if (massageArr.length !== 0 ) {
            massageArr.forEach(item => state.messageList.push(item))
        }
    },
    DELETE_MESSAGE: (state, index) => {
        state.messageList.splice(index, 1)
    },
    ADD_TOKEN_TO_LIST: (state, item) => {
        state.tokensList.push(item)
    },
    DELETE_TOKEN_FROM_LIST: (state, index) => {
        state.tokensList.splice(index, 1)
    },
    CHANGE_FLAG: (state) => {
        state.dropDownFlagForAccountListMBumper = !state.dropDownFlagForAccountListMBumper
    },
    CHANGE_DELETE_MESSAGE_FLAG: (state) => {
        state.deleteMessagesFlag = !state.deleteMessagesFlag
    }
}
export const actions = {
    CREATE_TASK_MESSAGE_BUMPER: async (ctx, obj) => {
        let  deleteMessageObj = {
            active: ctx.state.deleteMessagesFlag,
            deleteDelay: obj.deleteMassages
        }

        let bumperObj = {
            delay: obj.delay,
            channelList: ctx.state.channelList,
            messageList: ctx.state.messageList,
            tokensList: ctx.state.tokensList,
            deleteMessageObj: deleteMessageObj,
        }
        console.log(bumperObj)
        await launchBumperTask(bumperObj);
    },

    VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER: async (ctx, token) => {
        let notRepeat = true
        for (const tokenItem of ctx.state.tokensList) {
            if(tokenItem.token === token) {
                notRepeat = false
                ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "repeatTokens", data: token}, {root: true})
            }
        }
        if (notRepeat) {
            const result = await validateSingleToken(token);
            if (result.errorToken !== undefined) {
                ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "errorTokens", data:  result.errorToken}, {root: true})
            } else {
                ctx.commit('ADD_TOKEN_TO_LIST', result.singleToken);
                ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "successTokens", data:  result.singleToken}, {root: true})
            }
        }
    },

    DOWNLOADING_FILE: () => {
        alert('Возможно сделаем тут копирование')
    },
    EXTRACT_AND_VALIDATE_TOKENS_FOR_MASSAGER_BUMPER: async (ctx, tokensObj) => {
        for (const tokensElement of tokensObj) {
            for (const tokenItem of ctx.state.tokensList) {
                if (tokensElement === tokenItem.token) {
                    ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "repeatTokens", data: tokensElement}, {root: true})
                }
            }
        }
        const {input, errorToken} = await validateAndExtractTokens(tokensObj);
        for (const inputElement of input) {
            let notRepeat = true
            for (const tokenItem of ctx.state.tokensList) {
                if (inputElement.singleToken.token === tokenItem.token) {
                    notRepeat = false
                }
            }
            if (notRepeat) {
                if (inputElement.errorToken !== undefined) {
                    ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "errorTokens", data:  inputElement.errorToken}, {root: true})
                } else {
                    ctx.commit('ADD_TOKEN_TO_LIST', inputElement.singleToken);
                    ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "successTokens", data:  inputElement.singleToken}, {root: true})
                }
            }
        }
    },

    GET_CHANNEL_NAME: async (ctx, channelId, token) => {
        //Example channel ID
        // channelId = '912446085388181608';
        // token = 'exampleToken';
        const me = await getMe(token);

        // Image Url
        let channelName;
        console.log(channelId)
        await axios.get(`https://discord.com/api/v9/channels/${channelId}`, {
            headers: buildHeaders(token, me.email),
            withCredentials: true
        }).then((response) => {
            channelName = response.data.name;
        }).catch((e) => console.log(e));
        // commit image Url and set in channel
    },
    //
    // CREATE_TASK: async () => {
    //     const channelList = [];
    //     const messageList = [];
    //     const mainToken = '';
    //     const messageDelay = 1000;
    //
    //     const deleteMessageObj = {
    //         active: true,
    //         deleteDelay: 10000
    //     }
    //
    //     const bumperObj = {
    //         delay: messageDelay,
    //         channelList: channelList,
    //         messageList: messageList,
    //         token: mainToken,
    //         deleteMessageObj: deleteMessageObj
    //     }
    //
    //     await launchBumperTask(bumperObj);
    // }
}


