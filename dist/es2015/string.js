export const pad = (str, character, totalLength) => {
    if (str.length >= totalLength) {
        return str;
    }
    return Array(totalLength - str.length).fill(character).join('') + str;
};
export const toStringWithLeadingZeros = (number, intFix, fractionFix) => {
    const numberStr = number.toFixed(fractionFix);
    const [int, fraction] = numberStr.split('.');
    if (fraction === undefined) {
        return pad(int, 0, intFix);
    }
    return `${pad(int, 0, intFix)}.${fraction}`;
};
