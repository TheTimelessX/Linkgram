"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
var uuid = require("uuid");
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Object.defineProperty(Factory.prototype, "bNumber", {
        get: function () {
            return parseInt(uuid.v4().replace(/-/g, '').slice(0, 10), 16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Factory.prototype, "bHash", {
        get: function () {
            return uuid.v4();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Factory.prototype, "bMultiHash", {
        get: function () {
            var hsh = "";
            for (var i = 0; i < 5; i++) {
                hsh += uuid.v4();
            }
            return hsh;
        },
        enumerable: false,
        configurable: true
    });
    return Factory;
}());
exports.Factory = Factory;
