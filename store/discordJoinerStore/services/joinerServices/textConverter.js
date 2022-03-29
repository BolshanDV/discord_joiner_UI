export function converter(text) {
    let tokensObj
    if (text.indexOf('\n') !== -1) {
        tokensObj = [...new Set(text.split('\n'))]
    } else if (text.indexOf(';') !== -1) {
        tokensObj = [...new Set(text.split(';'))]
    } else if (text.indexOf(' ') !== -1) {
        tokensObj = [...new Set(text.split(' '))]
    } else {
        tokensObj = [text]
    }
    return tokensObj
}
