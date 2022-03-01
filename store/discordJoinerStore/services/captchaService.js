import axios from "axios";

export async function solveCaptcha() {
    const response = await axios.get("http://localhost:3300/").then(response => {
        return response.data;
    });

    return response;
}