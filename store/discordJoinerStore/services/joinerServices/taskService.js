import axios from "axios";
import {solveCaptcha} from "./captchaService";
import {buildHeaders} from "../../utils/requestUtils";
import {getMe} from "./validateService";

// sleep function for delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// main task management function
export async function launchTasks(tokens, inviteCode, delay) {
    // TODO Reaction module must contain true/false position respectively, and another module
    // Variables for code readability

    const reactionClickerMode = false;
    const sendCommandMode = false;

    const errorTokens = [];
    const successTokens = [];

    for (const token of tokens) {
        // execute a request to get information about the user to receive mail
        const me = await getMe(token.token);

        // after that we pass email and token to the function of joining the channel itself
        const status = await joinChannel(inviteCode, token.token, me.email);

        //In this if there will be a large number of checks for all kinds of situations:
        // 1) is reaction clicker enabled
        // 2) is send command enabled
        // Depending on this, there may be a need for additional requests, as a result
        // of which they must be added to success tokens to display the current status of the task to the client
        if (status && !reactionClickerMode && !sendCommandMode) {
            const userObj = { username: token.username, token: token.token }
            console.log(userObj);

            successTokens.push(userObj);
        } else if (status && reactionClickerMode) {
            // some logic
        } else if (status && sendCommandMode) {
            // some logic
        } else {
            errorTokens.push(token);
        }

        await sleep(delay);
    }

    return {successTokens: successTokens, errorTokens: errorTokens};
}

export async function joinChannel(inviteCode, token, email) {
    const captchaToken = await solveCaptcha();

    let body;
    let statusCode;

    await axios.post(`https://discord.com/api/v9/invites/${inviteCode}`,{
        'captcha_key': captchaToken
    }, {
        withCredentials: true,
        // build headers functions will be generate some headers and created minimal version of request
        headers: buildHeaders(token, email)
    }).then(response => {
        statusCode = response.status;
        body = response.data;
    });

    return statusCode === 200;
}