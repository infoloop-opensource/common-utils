import {Comparator} from "@infoloop-opensource/abstractions";

export const identity = <S> (s: S) => s;

export const compareNumber: Comparator<number> = (a, b) => {
    if (a === b) {
        return 0;
    }
    if (a < b) {
        return -1;
    }
    return 1;
};

export const compareNumberPair: Comparator<[number, number]> = (a, b) => {
    return compareNumber(a[0], b[0]) || compareNumber(a[1], b[1]);
};

