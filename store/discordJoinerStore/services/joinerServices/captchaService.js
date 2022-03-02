import axios from "axios";

export async function solveCaptcha() {
    return await axios.get("http://localhost:3300/").then(response => {
        return response.data;
    })
        .catch(error => console.log(error))
}
