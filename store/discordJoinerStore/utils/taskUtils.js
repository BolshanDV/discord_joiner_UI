export function findTask(tasks, taskName) {
    for (const task of tasks) {
        if (task.taskName === taskName) { return { status: true, task: task }  }
    }

    return { status: false,  task: null};
}
