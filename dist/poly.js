"use strict";
/*
poly(
    [
        [r.string, r.string],
        (a, b) => // a and b are string
    ],
    [
        [r.string, r.Array(r.number)],
        (a, b) => // a is string, b is number[]
    ]
)
*/
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
exports.poly = (...overloads) => 
// Not to worry, this is not actually `any`.
// The type is inferred correctly at call-site
((...args) => {
    for (const matcher in overloads) {
        const [preds, target] = overloads[matcher];
        if (common_1.every(preds, args)) {
            return target.call({ strategy: matcher }, ...args);
        }
    }
    throw new Error("The parameters passed did not match any of the overloads.");
});
//# sourceMappingURL=poly.js.map