import md5 from "../../vendors/md5.min";

function md5ByObject(obj) {
    let concatHash = "";

    for (let key in obj) {
        concatHash += md5(obj[key].toString());
    }

    return md5(concatHash);
}

export async function auth(token, resultHash) {
    const headers = {
        'X-Authorization': token,
        'X-Hash': md5ByObject(resultHash),
        'X-Application-Id': 'discordJoiner',
        "content-length": "0",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "ru,en-US;q=0.9,en;q=0.8,de;q=0.7",
        'X-Version': '1.0.0'
    }

    let response = await fetch("https://crypto.cmd-root.com/api/app/auth/b/token", {
        method: 'POST',
        headers: headers
    });

    if (response.status === 200) {
        this.$store.commit('authStore/authorization/SET_TOKEN')
        this.$router('/discordJoiner')
    } else {
        // store.commit('authStore/authorization/CLEAR_TOKEN')
        this.$router('/')
    }
}
