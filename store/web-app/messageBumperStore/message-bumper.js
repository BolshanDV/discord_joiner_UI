import {
    validateAndExtractTokens,
    validateSingleToken
} from "../discordJoinerStore/services/joinerServices/validate-service";
import {changeActiveFlag, getLoopIterationForSelectTask, launchBumperTask} from "./services/task-service";
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
    singleToken: "",
    url: ''
})

export const getters = {
    channelList: state => state.channelList,
    messageList: state => state.messageList,
    dropDownFlagForAccountListMBumper: state => state.dropDownFlagForAccountListMBumper,
    deleteMessagesFlag: state => state.deleteMessagesFlag,
    keyUpdate: state => state.keyUpdate,
    tasksStatusMessageBumper: state => state.tasksStatusMessageBumper,
    singleToken: state => state.singleToken,
    deleteMessagesLoop: state => state.deleteMessagesLoop,
    urlFile: state => state.url
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
        messageObj.forEach((message) => {state.messageList.push(message)})
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
        const obj2 = JSON.stringify(bumperObj);
        state.tasksStatusMessageBumper.push(JSON.parse(obj2))
        localStorage['tasksStatusMessageBumper'] = JSON.stringify(state.tasksStatusMessageBumper);
        localStorage['channelListMB'] = JSON.stringify(bumperObj.channelList);
        localStorage['messageListMB'] = JSON.stringify(bumperObj.messageList);
        localStorage['tokenMB'] = bumperObj.token.toString();
        localStorage['deleteMessageMB'] = JSON.stringify(bumperObj.deleteMessageObj);
        localStorage['delayMB'] = bumperObj.delay.toString();
        localStorage['loopMessageMB'] = JSON.stringify(bumperObj.loopMessageObj);
    },
    CHANGE_PROCESSING_FLAG_M_BUMPER: (state, obj) => {
        state.tasksStatusMessageBumper[obj.id].processingTaskObj = {
            text: obj.text,
            style: obj.style
        }
        localStorage['tasksStatusMessageBumper'] = JSON.stringify(state.tasksStatusMessageBumper);

    },
    DELETE_TASK_MESSAGE_BUMPER: (state, id) => {
        state.tasksStatusMessageBumper.splice(id, 1)
        localStorage['tasksStatusMessageBumper'] = JSON.stringify(state.tasksStatusMessageBumper);

    },
    SAVE_LOOP_ITERATION: (state, obj) => {
        state.tasksStatusMessageBumper[obj.id].loopMessageObj.loopIteration = obj.loopIteration
        localStorage['tasksStatusMessageBumper'] = JSON.stringify(state.tasksStatusMessageBumper);
    },

    GET_DATA_FROM_LOCAL_STORAGE_MB: (state) => {
        if (localStorage['tasksStatusMessageBumper']) {
            state.tasksStatusMessageBumper = JSON.parse(localStorage['tasksStatusMessageBumper'])
        }
        if (localStorage['messageListMB']){
            state.messageList = JSON.parse(localStorage['messageListMB'])
        }
        if (localStorage['channelListMB']) {
            state.channelList = JSON.parse(localStorage['channelListMB'])
        }
        if (localStorage['deleteMessageMB']) {
            state.deleteMessagesFlag = JSON.parse(localStorage['deleteMessageMB']).active
        }
        if (localStorage['loopMessageMB']) {
            state.deleteMessagesLoop = JSON.parse(localStorage['loopMessageMB']).active
        }
    },

    CHANGE_PAUSE_PLAY_FLAG: (state, obj) => {
        if (obj.taskName === -1) {
            for (let i = 0; i < state.tasksStatusMessageBumper.length; i++){
                state.tasksStatusMessageBumper[i].playPauseFlag = 'play'
            }
        } else {
            let id = findTaskInMainArray(state.tasksStatusMessageBumper, obj.taskName)
            state.tasksStatusMessageBumper[id].playPauseFlag = obj.statusFlag
        }
    },

    SAVE_URL: (state, fileUrl) => {
        state.url = fileUrl
        console.log(state.url)
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
            loopIteration: 0
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
            loopMessageObj: loopMessageObj,
            playPauseFlag: 'play'
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
        ctx.commit('CHANGE_PAUSE_PLAY_FLAG', {taskName: bumperObj.taskName, statusFlag: 'stop'})
        let flagProcessing = await launchBumperTask(bumperObj)
        if (flagProcessing) {
            ctx.commit('CHANGE_PROCESSING_FLAG_M_BUMPER', {id: index, text: "successfully", style: "success"})
            ctx.commit('CHANGE_PAUSE_PLAY_FLAG', {taskName: bumperObj.taskName, statusFlag: 'play'})
        } else {
            ctx.commit('CHANGE_PROCESSING_FLAG_M_BUMPER', {id: index, text: "Failed", style: "failed"})
            ctx.commit('CHANGE_PAUSE_PLAY_FLAG', {taskName: bumperObj.taskName, statusFlag: 'play'})
        }
    },

    UPDATE_LOOP_ITERATION: (ctx, taskName) => {
        setInterval(() => {
            let obj = {
                id: findTaskInMainArray(ctx.state.tasksStatusMessageBumper, taskName),
                loopIteration: getLoopIterationForSelectTask(taskName)
            }
            ctx.commit('SAVE_LOOP_ITERATION', obj)
        }, 2000)
    },

    PlAY_ALL_TASK_MESSAGE_BUMPER: (ctx) => {
        for (const bumperObj of ctx.state.tasksStatusMessageBumper) {
            ctx.dispatch('PlAY_TASK_MESSAGE_BUMPER', bumperObj )
        }
    },

    STOP_TASK: (ctx, taskName) => {
        ctx.commit('CHANGE_PAUSE_PLAY_FLAG', {taskName: taskName, statusFlag: 'play'})
        changeActiveFlag(taskName)
    },

    VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER: async (ctx, token) => {
            const result = await validateSingleToken(token);
            if (result.errorToken !== undefined) {
            } else {
                ctx.commit('VALIDATE_TOKEN', result.singleToken);
            }
    },

    EXTRACT_AND_VALIDATE_TOKENS_FOR_MASSAGER_BUMPER: async (ctx, tokensObj) => {
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
                } else {
                    ctx.commit('ADD_TOKEN_TO_LIST', inputElement.singleToken);
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

    DOWNLOADING_FILE: (ctx) => {
        let text = ''
        for (const message of ctx.state.messageList) {
            text+= message + '\n'
        }
            let data = new Blob([text],{type: 'text/plain'})
            let fileUrl = window.URL.createObjectURL(data)
            ctx.commit('SAVE_URL', fileUrl)
    },
}


