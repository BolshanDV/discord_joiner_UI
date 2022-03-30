import axios from "axios";
import {buildHeaders} from "@/store/utils/requestUtils";
import {getMe} from "@/store/discordJoinerStore/services/joinerServices/validateService";
import {logs} from "@/store/logger";

export let successAccounts = 0;

function incrementCounterAndRecordLog(token) {
    successAccounts++;
    logs.push({type: 'JOINER', subtype: 'INFO', message: `Discord account ${token} successfully entered the channel`});
}

/**
 * @param {string} [taskParameters.inviteCode = https://discord.gg/qdpSJwTR,qdpSJwTR] - invite code in channel
 * @param {string[]|string} [taskParameters.tokens = [token1, token2]] - token list ore single token
 * @param {string[]|string} [taskParameters.proxy = [token1, token2]] - token list ore single token
 * @param {string[]|string} [taskParameters.proxies = [proxy1, proxy2]] - proxy list ore single proxy
 * @returns {Promise<void>}
 */
export async function startTaskAsynchronously(taskParameters) {
     const preparedTaskObj = prepareTaskParamsObject(taskParameters);
     await setEmails(preparedTaskObj);

     preparedTaskObj.tokens.forEach((obj) => {
         axios.post(`https://discord.com/api/v9/invites/${taskParameters.inviteCode}`, {}, {
             withCredentials: true,
             headers: buildHeaders(obj.token, obj.email)
         }).then((res) => {
             (res.status === 200)
                 ? incrementCounterAndRecordLog(obj.token)
                 : logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${obj.token} while joining the channel`});
         }).catch((e) => {
             console.log(e);
             logs.push({type: 'JOINER', subtype: 'ERROR', message: `An error occurred on the account ${obj.token} while joining the channel`});
         })
     });
}

/**
 * @description This is a function that converts string representations to an array and converts the invite code from a link to a string code without a url path
 * @param taskParameters {{inviteCode?: string, tokens?: (string[]|string), proxy?: (string[]|string), proxies?: (string[]|string)}}
 * @returns {{inviteCode: "For example: qdpSJwTR", tokens: [{"token": "token1", "proxy": "someProxy1", "email": "somemail@bk.ru"}, {"token": "token2", "proxy": "someProxy2", "email": "somemail@bk.ru"}]}}
 */
function prepareTaskParamsObject(taskParameters) {
    const obj = {
        inviteCode: undefined,
        tokens: [],
        proxies: undefined
    }

    taskParameters.inviteCode.includes('https')
        ? obj.inviteCode = taskParameters.inviteCode.split(".gg/")[1]
        : obj.inviteCode = taskParameters.inviteCode;

    if (Array.isArray(taskParameters.tokens)) {
        taskParameters.tokens.forEach((token) => {
            obj.tokens.push({token: token, proxy: undefined, email: undefined});
        })
    } else {
        obj.tokens.push({token: taskParameters.tokens, proxy: undefined, email: undefined})
    }

    allocateProxy(obj, taskParameters);

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
        obj.tokens.forEach((obj) => {
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
}
