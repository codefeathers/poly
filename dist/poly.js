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
const runtype_1 = __importDefault(require("@codefeathers/runtype"));
const predicates = [runtype_1.default.string, runtype_1.default.number];
exports.poly = (...overloads) => 
// Not to worry, this is not actually `any`.
// The type is inferred correctly at call-site
((...args) => {
    for (const overload of overloads) {
        const [preds, target] = overload;
        let passing = true;
        // TODO: fix, hasRest only works for >1 rest args,
        // but should work for 0 or many
        const hasRest = args.length > preds.length;
        for (let idx = 0; idx < preds.length; idx++) {
            const pred = preds[idx];
            const last = idx === preds.length - 1;
            // TODO: cache check results
            const checked = last && hasRest ? pred(args.slice(idx)) : pred(args[idx]);
            if (!checked) {
                passing = false;
                break; // don't check any more types
            }
        }
        if (passing) {
            return target(...args);
        }
    }
    throw new Error("The parameters passed did not match any of the overloads.");
});
const f = exports.poly(
//
[[runtype_1.default.string], (x) => x], [[runtype_1.default.number, runtype_1.default.number], (x, y) => x + 5], [[runtype_1.default.string, runtype_1.default.Array(runtype_1.default.number)], (x, ...ys) => [x, ys]]);
//# sourceMappingURL=poly.js.map