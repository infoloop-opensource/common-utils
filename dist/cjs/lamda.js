"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = function (s) { return s; };
exports.compareNumber = function (a, b) {
    if (a === b) {
        return 0;
    }
    if (a < b) {
        return -1;
    }
    return 1;
};
exports.compareNumberPair = function (a, b) {
    return exports.compareNumber(a[0], b[0]) || exports.compareNumber(a[1], b[1]);
};
