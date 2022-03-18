import {properties} from "../constants";

export function convertAndEncodeBase64(email) {
    const convertedProp = properties.replaceAll("email=example", encodeURI("https://discord.com/register?email=" + email));

    return btoa(convertedProp);
}