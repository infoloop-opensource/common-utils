
export const pad = (str: string, character: string | number, totalLength: number) => {
    if (str.length >= totalLength) {
        return str;
    }
    return Array(totalLength - str.length).fill(character).join('') + str;
};

export const toStringWithLeadingZeros = (number: number, intFix: number, fractionFix: number) => {
    const numberStr = number.toFixed(fractionFix);
    const [int, fraction] = numberStr.split('.');
    if (fraction === undefined) {
        return pad(int, 0, intFix);
    }
    return `${pad(int, 0, intFix)}.${fraction}`;
};
