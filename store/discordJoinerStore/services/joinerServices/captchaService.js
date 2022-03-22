import axios from "axios";

export async function solveCaptcha(captchaType, apiKey) {
    return await axios.post(`http://localhost:3300/${captchaType}`, {
        token: apiKey
    }).then(response => {
        return response.data;
    })
        .catch(error => console.log(error))
}
