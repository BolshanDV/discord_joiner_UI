import axios from "axios";
import {controller} from "./taskService";
import {logs} from "../../../logger";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function validateAndExtractTokens(tokens) {
        const result = [];

        let input = tokens
        let errorTokens = [];

        for (const token of input) {
            const body = await getMe(token);

            if (body.statusCode !== 200) {
                console.error(`Some error happened with token ${token}`);
                errorTokens.push(token);
                continue;
            }

            result.push({singleToken: {token: token, username: body.username}, errorToken: errorTokens})
        }

        return { input: result, errorToken: errorTokens };
}

export async function validateSingleToken(singleToken) {
    let errorToken = undefined;
    let body;

    body = await getMe(singleToken);

    if (body.statusCode !== 200) {
        errorToken = singleToken;

        return {singleToken: undefined, errorToken: errorToken};
    }

    return { singleToken: {token: singleToken, username: body.username}, errorToken: undefined };
}

export async function getMe(singleToken) {
    let statusCode;
    let body;

    await axios
        .get('https://discord.com/api/users/@me', {
                withCredentials: true,
                signal: controller.signal,
                headers: {
                    'authorization': singleToken
                }
            }
        )
        .then(response => {
            statusCode = response.status;
            body = response.data;
        })
        .catch(error => {
            console.log("There was an error!", error);
        });

    (statusCode === 200)
        ? logs.push({type: 'VALIDATE-SERVICE', subtype: 'INFO', message: `Account ${body.username} has been successfully initialized`})
        : logs.push({type: 'VALIDATE-SERVICE', subtype: 'ERROR', message: `Initialization failed for "${singleToken}" token`})

    body['statusCode'] = statusCode;
    await sleep(100);

    return body;
}
