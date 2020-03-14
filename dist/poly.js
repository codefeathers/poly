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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const runtype_1 = __importDefault(require("@codefeathers/runtype"));
exports.poly = (...overloads) => 
// Not to worry, this is not actually `any`.
// The type is inferred correctly at call-site
((...args) => {
    for (const overload of overloads) {
        const [preds, target] = overload;
        if (common_1.every(preds, args)) {
            return target(...args);
        }
    }
    throw new Error("The parameters passed did not match any of the overloads.");
});
const f = exports.poly(
//
[[runtype_1.default.string], (x) => "hello" + x], 
//
[[runtype_1.default.number, runtype_1.default.number], (x) => x + 1], 
//
[[runtype_1.default.number, runtype_1.default.number], (x, y) => x + y]);
//# sourceMappingURL=poly.js.map