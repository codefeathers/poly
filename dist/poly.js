"use strict";
/*
poly({
    a: [
        [t.String, t.String],
        (a, b) => // a and b are String
    ],
    b: [
        [t.String, t.Object],
        (a, b) => // a is String, b is Object
    ]
})
*/
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
exports.poly = (matchers, { rest = false } = {}) => (...args) => {
    for (const matcher in matchers) {
        const [preds, target] = matchers[matcher];
        if (common_1.every(preds, args, rest)) {
            return target(...args);
        }
    }
};
//# sourceMappingURL=poly.js.map