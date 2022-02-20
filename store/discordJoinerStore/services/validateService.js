import axios from "axios";

export async function validateAndExtractTokens(tokens) {
        let input = tokens.split(',');
        let errorToken = undefined;

        for (const token of input) {
            const status = await axios
                .get('https://discord.com/api/users/@me', {
                        withCredentials: true,
                        headers: {
                            'authorization': token
                        }
                    }
                ).then(response => {
                    return response.status;
                })

            if (status !== 200) {
                console.error(`Some error happened with token ${token}`);

                input = undefined;

                return { input: input, errorToken: errorToken };
            }
        }

        return { input: input, errorToken: errorToken };
}

export async function validateSingleToken(singleToken) {
    let errorToken = undefined;

    const status = await axios
        .get('https://discord.com/api/users/@me', {
                withCredentials: true,
                headers: {
                    'authorization': singleToken
                }
            }
        )
        .then(response => {
            return response.status;
        })
        .catch(error => {
            console.log("There was an error!", error);
        })

    if (status !== 200) {
        errorToken = singleToken;
    }

    return { singleToken: singleToken, errorToken: errorToken };
}