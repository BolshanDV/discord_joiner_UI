import axios from "axios";
import {controller} from "./taskService";

export async function solveCaptcha() {
    return await axios.get("http://localhost:3300/", {
        signal: controller.signal
    }).then(response => {
        return response.data;
    })
        .catch(error => console.log(error))
}
