"use strict";
/*
monopoly(
    [t.String, t.String, t.T],
    (a, b) => // a and b are String
)
*/
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
exports.monopoly = (preds, target) => (...args) => {
    const finalArgs = [];
    let predIdx = 0;
    for (let argIdx = 0; argIdx < args.length; argIdx++) {
        const pred = preds[predIdx];
        // no more predicates to go
        const last = predIdx === preds.length - 1;
        const arg = last ? args.slice(argIdx) : args[argIdx];
        if (common_1.check(pred, arg)) {
            finalArgs.push(arg);
            // only proceed to next predicate if an argument satisfies current
            predIdx++;
        }
        else {
            if (last) {
                // if the last predicate doesn't accept the remaining args, panic
                throw new Error(`Received too many arguments that do not pass given predicates: ${arg.join(", ")}`);
            }
            else
                finalArgs.push(undefined);
        }
    }
    return target(...finalArgs);
};
//# sourceMappingURL=monopoly.js.map