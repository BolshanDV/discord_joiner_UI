import axios from "axios";

export async function solveCaptcha(captchaType, apiKey) {
    const clientToken = apiKey;
    let captchaId;

    await axios.post('https://api.capmonster.cloud/createTask', {
        "clientKey": clientToken,
        "task":
            {
                "type":"HCaptchaTask",
                "websiteURL":"https://discord.com/channels/@me",
                "websiteKey":"4c672d35-0701-42b2-88c3-78380b0db560",
                "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
            }
    }).then(response => {
        captchaId = response.data.taskId;
    })
        .catch(error => console.log(error));

    let result;
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    // await sleep(10 * 1000);
    for(let i = 0; i < 60; i++) {
        try {
            const response = await axios.post('https://api.capmonster.cloud/getTaskResult/', {
                "clientKey":clientToken,
                "taskId": captchaId
            }).catch(error => console.log(error));
            if (response.data.status === 'ready') {
                result = response.data.solution.gRecaptchaResponse;
                break;
            }

            if (response.data.request !== 'CAPCHA_NOT_READY') {
                break;
            }

            await sleep(5 * 1000);
        } catch {

        }
    }

    return result;
}
