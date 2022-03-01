import axios from "axios";

export async function validateAndExtractTokens(tokens) {
        const result = [];

        let input = tokens.split(',');
        let errorToken = undefined;

        for (const token of input) {
            let statusCode;
            let body;

            await axios
                .get('https://discord.com/api/users/@me', {
                        withCredentials: true,
                        headers: {
                            'authorization': token
                        }
                    }
                ).then(response => {
                    statusCode = response.status;
                    body = response.data;
                })

            if (statusCode !== 200) {
                console.error(`Some error happened with token ${token}`);

                input = undefined;

                return { input: input, errorToken: errorToken };
            }

            result.push({singleToken: {token: token, username: body.username}, errorToken: errorToken})
        }

        return { input: result, errorToken: errorToken };
}

export async function validateSingleToken(singleToken) {
    let errorToken = undefined;
    let statusCode;
    let body;

    await axios
        .get('https://discord.com/api/users/@me', {
                withCredentials: true,
                headers: {
                    'authorization': singleToken
                }
            }
        )
        .then(response => {
            statusCode = response.status;
            body = response.data;
        })
        .catch(error => {
            console.log("There was an error!", error);
        })

    if (statusCode !== 200) {
        errorToken = singleToken;
    }

    return { singleToken: {token: singleToken, username: body.username}, errorToken: errorToken };
}

export async function getMe(singleToken) {
    let statusCode;
    let body;

    await axios
        .get('https://discord.com/api/users/@me', {
                withCredentials: true,
                headers: {
                    'authorization': singleToken
                }
            }
        )
        .then(response => {
            statusCode = response.status;
            body = response.data;
        })
        .catch(error => {
            console.log("There was an error!", error);
        })


    return body;
}