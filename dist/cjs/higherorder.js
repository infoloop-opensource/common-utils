"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymizeClass = function (clazz) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _super.apply(this, params) || this;
        }
        return class_1;
    }(clazz));
};
/**
 * decorate class at runtime
 * @param clazz
 * @param decorator
 */
exports.decorateClass = function (clazz, decorator) {
    return decorator(clazz);
};
