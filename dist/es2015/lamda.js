export const identity = (s) => s;
export const compareNumber = (a, b) => {
    if (a === b) {
        return 0;
    }
    if (a < b) {
        return -1;
    }
    return 1;
};
export const compareNumberPair = (a, b) => {
    return compareNumber(a[0], b[0]) || compareNumber(a[1], b[1]);
};
