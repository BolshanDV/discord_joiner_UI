import {userAgent} from "./constants";
import {convertAndEncodeBase64} from "./converters/encoder";

export function buildHeaders(token, email) {
    return {
        'authorization': token,
        'user-agent': userAgent,
        'referer': 'https://discord.com/',
        'x-super-properties': convertAndEncodeBase64(email)
    };
}