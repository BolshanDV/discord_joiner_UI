export let logs = [];

export function getLogs(type) {
    return (type === 'ALL') ? logs : findLogsByType(type);
}

export function clearLogs() {
    logs.length = 0;
}

function findLogsByType(type) {
    const filteredLogs = [];

    logs.forEach((log) => {
        if (log.type === type || log.type === 'VALIDATE-SERVICE')
            filteredLogs.push(log);
    })

    return filteredLogs;
}

