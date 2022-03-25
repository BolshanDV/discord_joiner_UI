import {
    validateAndExtractTokens,
    validateSingleToken
} from "../discordJoinerStore/services/joinerServices/validateService";
import {launchBumperTask, loopIteration} from "./services/taskService";
import {getIconAndChannelName} from "../utils/embedsLoader";
import {findTaskInMainArray} from "../utils/taskUtils";

export const state = () => ({
    channelList: [],
    messageList: [],
    dropDownFlagForAccountListMBumper: false,
    deleteMessagesFlag: false,
    deleteMessagesLoop: false,
    tasksStatusMessageBumper: [],
    keyUpdate: 0,
    singleToken: ""
})

export const getters = {
    channelList: state => state.channelList,
    messageList: state => state.messageList,
    dropDownFlagForAccountListMBumper: state => state.dropDownFlagForAccountListMBumper,
    deleteMessagesFlag: state => state.deleteMessagesFlag,
    keyUpdate: state => state.keyUpdate,
    tasksStatusMessageBumper: state => state.tasksStatusMessageBumper,
    singleToken: state => state.singleToken,
    deleteMessagesLoop: state => state.deleteMessagesLoop
}
export const mutations = {
    VALIDATE_TOKEN: (state, singleToken) => {
        state.singleToken = singleToken
    },

    ADD_CHANNEL_TO_LISTS: (state, channelElement) => {
        state.channelList.push(channelElement)
    },
    DELETE_CHANNEL: (state, index) => {
        state.channelList.splice(index, 1)
    },
    ADD_MESSAGE_TO_LISTS: (state, messageObj) => {
        if (typeof messageObj === 'string') {
            state.messageList.push(messageObj)
        } else if (Array.isArray(messageObj)) {
            messageObj.forEach((message) => {
               state.messageList.push(message);
            });
        }
    },
    ADD_MESSAGE_ARR_TO_LISTS: (state, massageArr) => {
        if (massageArr.length !== 0 ) {
            massageArr.forEach(item => state.messageList.push(item))
        }
    },
    DELETE_MESSAGE: (state, index) => {
        state.messageList.splice(index, 1)
    },
    CHANGE_FLAG: (state) => {
        state.dropDownFlagForAccountListMBumper = !state.dropDownFlagForAccountListMBumper
    },
    CHANGE_DELETE_MESSAGE_FLAG: (state) => {
        state.deleteMessagesFlag = !state.deleteMessagesFlag
    },
    CHANGE_LOOP_MESSAGE_FLAG: (state) => {
        state.deleteMessagesLoop = !state.deleteMessagesLoop
    },
    SAVE_MESSAGE_BUMPER_TASKS: (state, bumperObj) => {
        state.tasksStatusMessageBumper.push(bumperObj)
        state.channelList = []
        state.messageList = []
        state.dropDownFlagForAccountListMBumper = false
        state.deleteMessagesFlag = false
        state.deleteMessagesLoop = false
    },
    CHANGE_PROCESSING_FLAG_M_BUMPER: (state, obj) => {
        state.tasksStatusMessageBumper[obj.id].processingTaskObj = {
            text: obj.text,
            style: obj.style
        }
    },
    DELETE_TASK_MESSAGE_BUMPER: (state, id) => {
        state.tasksStatusMessageBumper.splice(id, 1)
    },
    SAVE_LOOP_ITERATION: (state, obj) => {
        state.tasksStatusMessageBumper[obj.id].loopMessageObj.loopIteration = obj.loopIteration
    }
}
export const actions = {
    CREATE_TASK_MESSAGE_BUMPER: async (ctx, obj) => {

        let  deleteMessageObj = {
            active: ctx.state.deleteMessagesFlag,
            deleteDelay: obj.deleteMassages
        }
        let loopMessageObj = {
            active: ctx.state.deleteMessagesLoop,
            deleteDelay: obj.messagesLoop,
            loopIteration: loopIteration
        }
        let processingTaskObj = {
            text: 'Task created',
            style: 'default'
        }
        let bumperObj = {
            taskName: obj.taskName,
            delay: obj.delay,
            channelList: obj.channelList,
            messageList: ctx.state.messageList,
            token: obj.token,
            deleteMessageObj: deleteMessageObj,
            processingTaskObj: processingTaskObj,
            loopMessageObj: loopMessageObj
        }

        let repeat = false
        for (const bumperObjElement of ctx.state.tasksStatusMessageBumper) {
            if(bumperObjElement.taskName === bumperObj.taskName){
                repeat = true
            }
        }
        if (!repeat) {
            ctx.commit('SAVE_MESSAGE_BUMPER_TASKS', bumperObj)
        }
    },

    PlAY_TASK_MESSAGE_BUMPER: async (ctx, bumperObj) => {
        if(bumperObj.loopMessageObj.active){
            ctx.dispatch('UPDATE_LOOP_ITERATION', bumperObj.taskName)
        }
        let index = findTaskInMainArray(ctx.state.tasksStatusMessageBumper, bumperObj.taskName)
        ctx.commit('CHANGE_PROCESSING_FLAG_M_BUMPER', {id: index, text: "In process", style: "process"})
        let flagProcessing = await launchBumperTask(bumperObj)
        if (flagProcessing) {
            ctx.commit('CHANGE_PROCESSING_FLAG_M_BUMPER', {id: index, text: "successfully", style: "success"})
        } else {
            ctx.commit('CHANGE_PROCESSING_FLAG_M_BUMPER', {id: index, text: "Failed", style: "failed"})
        }
    },

    UPDATE_LOOP_ITERATION: (ctx, taskName) => {
        setInterval(() => {
            let obj = {
                id: findTaskInMainArray(ctx.state.tasksStatusMessageBumper, taskName),
                loopIteration: loopIteration
            }
            ctx.commit('SAVE_LOOP_ITERATION', obj)
        }, 2000)
    },

    PlAY_ALL_TASK_MESSAGE_BUMPER: (ctx) => {
        for (const bumperObj of ctx.state.tasksStatusMessageBumper) {
            ctx.dispatch('PlAY_TASK_MESSAGE_BUMPER', bumperObj )
        }
    },

    VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER: async (ctx, token) => {
        // let notRepeat = true
        // for (const tokenItem of ctx.state.tokensList) {
        //     if(tokenItem.token === token) {
        //         notRepeat = false
        //         ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "repeatTokens", data: token}, {root: true})
        //     }
        // }
        // if (notRepeat) {
            const result = await validateSingleToken(token);
            if (result.errorToken !== undefined) {
                // ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "errorTokens", data:  result.errorToken}, {root: true})
            } else {
                ctx.commit('VALIDATE_TOKEN', result.singleToken);
                // ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "successTokens", data:  result.singleToken}, {root: true})
            }
        // }
    },

    EXTRACT_AND_VALIDATE_TOKENS_FOR_MASSAGER_BUMPER: async (ctx, tokensObj) => {
        for (const tokensElement of tokensObj) {
            for (const tokenItem of ctx.state.tokensList) {
                if (tokensElement === tokenItem.token) {
                    // ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "repeatTokens", data: tokensElement}, {root: true})
                }
            }
        }
        const {input} = await validateAndExtractTokens(tokensObj);
        for (const inputElement of input) {
            let notRepeat = true
            for (const tokenItem of ctx.state.tokensList) {
                if (inputElement.singleToken.token === tokenItem.token) {
                    notRepeat = false
                }
            }
            if (notRepeat) {
                if (inputElement.errorToken !== undefined) {
                    // ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "errorTokens", data:  inputElement.errorToken}, {root: true})
                } else {
                    ctx.commit('ADD_TOKEN_TO_LIST', inputElement.singleToken);
                    // ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {type: "successTokens", data:  inputElement.singleToken}, {root: true})
                }
            }
        }
    },

    GET_CHANNEL_INFO: async (ctx, channelObj ) => {
        const embeds = await getIconAndChannelName(channelObj);

        if (embeds.channelName !== undefined && embeds.iconUrl !== undefined) {
            ctx.commit('ADD_CHANNEL_TO_LISTS', {
                channelName: embeds.channelName,
                iconUrl: embeds.iconUrl,
                channelId: channelObj.channelId
            })
        }
    },
}


