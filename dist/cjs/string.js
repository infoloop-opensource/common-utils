"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pad = function (str, character, totalLength) {
    if (str.length >= totalLength) {
        return str;
    }
    return Array(totalLength - str.length).fill(character).join('') + str;
};
exports.toStringWithLeadingZeros = function (number, intFix, fractionFix) {
    var numberStr = number.toFixed(fractionFix);
    var _a = numberStr.split('.'), int = _a[0], fraction = _a[1];
    if (fraction === undefined) {
        return exports.pad(int, 0, intFix);
    }
    return exports.pad(int, 0, intFix) + "." + fraction;
};
