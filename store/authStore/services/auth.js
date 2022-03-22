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
        'X-Version': '',
        'X-Application-Id': 'discordJoiner'

    }
    console.log(headers)
    let response = await fetch("https://cmd-root.com/api/app/auth/b/token", {
        method: 'POST',
        headers: headers
    });

    if (response.status === 200) {
        this.$store.commit('authStore/authorization/SET_TOKEN')
    } else {
        this.$store.commit('authStore/authorization/CLEAR_TOKEN')

    }
}
