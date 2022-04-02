import {buildHeaders} from "~/store/web-app/utils/requestUtils";
import {getMe} from "~/store/web-app/discordJoinerStore/services/joinerServices/validate-service";
import {logs} from "~/store/web-app/logger";
import {createAxiosInstance} from "~/store/web-app/discordJoinerFastModeStore/fastModeServices/https-agent-service";
import {sleep} from "~/store/web-app/discordJoinerStore/services/joinerServices/extended-task-service";

/**
 * @description it's global variable for UI
 * @type {*[]}
 */
export const tasks = [];

/**
 * @description This function must record log info and increment counter success tokens accounts
 * @param {string} token - some token of user
 * @param {Date} id - id task
 * @return {VoidFunction}
 */
function incrementCounterAndRecordLog(token, id) {
    tasks.forEach(task => { if (task.id === id) task.successAccounts++ });

    logs.push({type: 'JOINER', subtype: 'INFO', message: `Discord account ${token} successfully entered the channel`});
}

/**
 * @param {Date} [taskParameters.id] - uniq identification
 * @param {string} [taskParameters.inviteCode = https://discord.gg/qdpSJwTR,qdpSJwTR] - invite code in channel
 * @param {string[]|string} [taskParameters.tokens = [token1, token2]] - token list ore single token
 * @param {string[]|string} [taskParameters.proxies = [proxy1, proxy2]] - proxy list ore single proxy
 * @param {number} [taskParameters.delay = 3000] - delay
 * @returns {Promise<boolean>}
 */
export async function startTaskAsynchronously(taskParameters) {
    const preparedTaskObj = await prepareTaskParamsObject(taskParameters);
    tasks.push({id: taskParameters.id, successAccounts: 0});

    for (const obj of preparedTaskObj.tokens) {
        const axiosInstance = createAxiosInstance(obj.proxy);

        axiosInstance.post(`https://discord.com/api/v9/invites/${preparedTaskObj.inviteCode}`, {}, {
            withCredentials: true,
            headers: buildHeaders(obj.token, obj.email)
        }).then((res) => {
            (res.status === 200)
                ? incrementCounterAndRecordLog(obj.token, taskParameters.id)
                : logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${obj.token} while joining the channel`});
        }).catch((e) => {
            console.log(e);
            logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${obj.token} while joining the channel`});
        });

         await sleep(taskParameters.delay);
    }

    return true;
}

/**
 * @description This is a function that converts string representations to an array and converts the invite code from a link to a string code without a url path
 * @param taskParameters {{inviteCode?: string, tokens?: (string[]|string), proxy?: (string[]|string), proxies?: (string[]|string)}}
 * @returns {{inviteCode: "For example: qdpSJwTR", tokens: [{"token": "token1", "proxy": "someProxy1", "email": "somemail@bk.ru"}, {"token": "token2", "proxy": "someProxy2", "email": "somemail@bk.ru"}]}}
 */
async function prepareTaskParamsObject(taskParameters) {
    const obj = {
        inviteCode: undefined,
        tokens: [],
    }

    taskParameters.inviteCode.includes('https')
        ? obj.inviteCode = taskParameters.inviteCode.split('.gg/')[1]
        : obj.inviteCode = taskParameters.inviteCode;


    if (Array.isArray(taskParameters.tokens)) {
        taskParameters.tokens.forEach((token) => {
            obj.tokens.push({token: token.token, proxy: undefined, email: undefined});
        })
    } else {
        obj.tokens.push({token: taskParameters.tokens, proxy: undefined, email: undefined})
    }

    allocateProxy(obj, taskParameters);
    await setEmails(obj);

    return obj;
}

/**
 * @description This is the function of distributing proxies by tokens
 * @returns {{inviteCode: "For example: qdpSJwTR", tokens: [{"token": "token1", "proxy": "someProxy1"}, {"token": "token2", "proxy": "someProxy2"}]}}
 */
function allocateProxy(obj, taskParameters) {
    const qtyTokens = obj.tokens.length;
    const qtyProxies = Array.isArray(taskParameters.proxies)
        ? taskParameters.proxies.length
        : null;

    let tokensPerProxy;

    if (qtyProxies) tokensPerProxy = qtyTokens/qtyProxies;

    let proxyIterator = 0;
    let tokenIterator = 1;

    if (qtyProxies <= qtyTokens) {
        obj.tokens.forEach((obj, index, array) => {
            if (index === array.length) {obj.proxy = taskParameters.proxies[taskParameters.proxies.length - 1]}
            obj.proxy = taskParameters.proxies[proxyIterator];
            tokenIterator++;

            if (tokenIterator % tokensPerProxy === 0 || tokensPerProxy === 0) proxyIterator++;
        })
    } else {
        // some error
    }

    return obj;
}

async function setEmails(preparedTaskObj) {
    for (let i = 0; i < preparedTaskObj.tokens; i++) {
        preparedTaskObj.email = await getMe(preparedTaskObj[i].token);
    }

    return preparedTaskObj;
}
