const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')
const axios = require("axios");

router.post('/2captcha', bodyparser.json(), async (req, res) => {
    const clientToken = req.body.token;
    let captchaId;

    await axios.get(`http://2captcha.com/in.php?key=${clientToken}&method=hcaptcha&sitekey=4c672d35-0701-42b2-88c3-78380b0db560&pageurl=https://discord.com/channels/@me`
    ).then(response => {
        captchaId = response.data.split("|")[1];
    });

    let result;
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(10 * 1000);
    for(let i = 0; i < 60; i++) {
        try {
            const response = await axios.post(`http://2captcha.com/res.php?key=${clientToken}&action=get&id=${captchaId}`);
            if (response.data.includes("OK")) {
                result = response.data.split("|")[1];
                break;
            }

            if (response.data !== 'CAPCHA_NOT_READY') {
                break;
            }

            await sleep(5 * 1000);
        } catch {

        }
    }

    res.send(result);
});

module.exports = router;