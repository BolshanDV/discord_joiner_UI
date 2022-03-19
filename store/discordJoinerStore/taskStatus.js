import {setStopCriticalFlag} from "./services/joinerServices/taskService"
import {clearLogs, getLogs} from "../logger";

export const state = () => ({
    playStopFlag: true,
    logs: []
})

export const getters = {
    playStopFlag: state => state.playStopFlag,
    logs: state => state.logs,
    date: () => Date.now()
}
export const mutations = {
    ADD_LOGS: (state, item) => {
        let obj = {
            logs: item.message,
            date: new Date(),
            subtype: item.subtype,
            type: item.type
        }
        state.logs.unshift(obj)
    },

    CLEAT_LOGS_STATE: (state) => {
        state.logs = []
    }
}
export const actions = {
    PAUSE_TASK: (ctx) => {
        ctx.commit('CHANGE_PLAY_TO_STOP')
    },

    PLAY: (ctx) => {
        ctx.commit('CHANGE_PLAY_TO_STOP')
    },

    PROCESS_LOGS: (ctx) => {
        setInterval(() => {
            const logs = getLogs('ALL');
            if(ctx.state.logs.length < logs.length) {
                ctx.commit('ADD_LOGS', logs[logs.length - 1])
            }
        }, 100);
    },

    STOP_ALL_TASKS: (ctx) => {
        ctx.dispatch('toastedStore/toasted/ADDING_ERROR', {
                type: 'stopAllTasks'
            },
            {root: true}
        )
        setStopCriticalFlag()
    },

    CLEAR_LOGS: (ctx) => {
        clearLogs()
        ctx.commit('CLEAT_LOGS_STATE')
    }
}


