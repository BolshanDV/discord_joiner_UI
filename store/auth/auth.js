export async function auth(token) {
    // Object which must be get from UI
    let resultHash = {
        'hardwareConcurrency': navigator.hardwareConcurrency,
        'width': window.screen.width,
        'height': window.screen.height,
        'colorDepth': window.screen.colorDepth,
        'appVersion': navigator.appVersion,
        'appCodeName': navigator.appCodeName,
        'appName': navigator.appName,
        'platform': navigator.platform
    }

    const headers = {
        'X-Authorization': token,
        'X-Hash': md5ByObject(resultHash),
        'X-Version': '',
        'X-Application-Id': 'discordJoiner'

    }

    let response = await fetch("https://cmd-root.com/api/app/auth/b/token", {
        method: 'POST',
        headers: headers
    });

    if (response.status === 200) {

    }

    function md5ByObject(obj) {
        let concatHash = "";

        for (let key in obj) {
            concatHash += md5(obj[key].toString());
        }

        return md5(concatHash);
    }
}