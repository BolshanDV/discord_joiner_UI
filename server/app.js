const express = require('express')
const axios = require("axios");
const app = express()
const port = 3300

const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), async (req, res) => {
    const siteKey = "4c672d35-0701-42b2-88c3-78380b0db560";
    const apiKey = "4ce65dfa641e0052634cbc7cfd7f002c";

    const reqUrl = `https://2captcha.com/in.php?key=${apiKey}&method=hcaptcha&sitekey=${siteKey}&pageurl=https://discord.com`;

    let captchaId;
    const resp = await axios.get(`https://2captcha.com/in.php?key=${apiKey}&method=hcaptcha&sitekey=${siteKey}&pageurl=${encodeURIComponent('https://discord.com')}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'origin': 'https://discord.com'
        }
    }).then(response => {
        captchaId = response.data;
    });

    let result;
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(10 * 1000);
    for(let i = 0; i < 60; i++) {
        try {
            const response = await axios.get(`https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId.split("|")[1]}&json=1`);
            if (response.data.status === 1) {
                result = response.data.request;
                break;
            }

            if (response.data.request !== 'CAPCHA_NOT_READY') {
                break;
            }

            await sleep(5 * 1000);
        } catch {

        }
    }
    console.log(result);

    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
