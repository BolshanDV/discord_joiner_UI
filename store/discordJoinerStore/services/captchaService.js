import axios from "axios";

export async function solveCaptcha() {
    const siteKey = "4c672d35-0701-42b2-88c3-78380b0db560";
    const apiKey = "4ce65dfa641e0052634cbc7cfd7f002c";

    const reqUrl = `https://2captcha.com/in.php?key=${apiKey}&method=hcaptcha&sitekey=${siteKey}&pageurl=https://discord.com`;

    const response = await axios.get(`https://2captcha.com/in.php?key=${apiKey}&method=hcaptcha&sitekey=${siteKey}&pageurl=${encodeURIComponent('https://discord.com')}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'origin': 'https://discord.com'
        }
    }).then(response => {
        return response.data;
    });

    let i = 0;

    return response;
}