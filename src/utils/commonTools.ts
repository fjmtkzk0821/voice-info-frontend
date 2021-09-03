export function didContainString(phase: string, key: string) {
    let regExp = new RegExp(key);
    return regExp.test(phase);
}

export function isStringNullOrEmpty(str: string) {
    return str == null || str.length === 0;
}