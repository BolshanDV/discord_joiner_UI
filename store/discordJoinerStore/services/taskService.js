import axios from "axios";
import {solveCaptcha} from "./captchaService";

export async function joinChannel(inviteCode, token) {
    let result;
    const captchaToken = await solveCaptcha();

    let body;
    let statusCode;

    await axios.post(`https://discord.com/api/v9/invites/${inviteCode}`,{
        'captcha_key': captchaToken
    }, {
        withCredentials: true,
            headers: {
                'authorization': token.token,
                'user-agent': 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                'referer': 'https://discord.com/'
        }
    }).then(response => {
        statusCode = response.status;
        body = response.data;
    });

    (statusCode !== 200)
        ? result = {successToken: undefined, errorToken: token}
        : result = {successToken: token, errorToken: undefined}

    return result;
}