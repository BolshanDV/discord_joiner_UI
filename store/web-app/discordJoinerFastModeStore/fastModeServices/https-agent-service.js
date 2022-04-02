const HttpsProxyAgent = require("https-proxy-agent");
let axios = require("axios");

export function createAxiosInstance(proxy) {
    const parsedProxy = proxyParser(proxy);
    const httpsAgent = new HttpsProxyAgent({host: parsedProxy.host, port: parsedProxy.port, auth: parsedProxy.auth});

    axios = axios.create(httpsAgent);

    return axios;
}

function proxyParser(proxy) {
    const parsedProxy = {
        host: undefined,
        port: undefined,
        auth: undefined
    }
    if ( proxy === undefined) return parsedProxy
    parsedProxy.host = proxy.split(':')[0];
    parsedProxy.port = proxy.split(':')[1];
    parsedProxy.auth = proxy.split(':')[2] + proxy.split(':')[3];

    return parsedProxy;
}
