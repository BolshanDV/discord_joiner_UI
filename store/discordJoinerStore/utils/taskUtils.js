export function findTask(tasks, taskName) {
    for (const task of tasks) {
        if (task.taskName === taskName) { return { status: true, task: task }}
    }
    return { status: false,  task: [] };
}

export function findTaskInMainArray(mainArray, taskName) {
    for (let i = 0; i < mainArray.length; i++) {
        if (mainArray[i].taskName === taskName) {
            return i;
        }
    }
    return -1;
}
