import axios from "axios";

export async function solveCaptcha() {
    const response = await axios.get("http://localhost:3300/");

    return response.data;
}