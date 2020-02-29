"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matcherCache = new WeakMap();
exports.check = (pred, arg) => {
    if (pred(arg)) {
        matcherCache.set(pred, arg);
        return true;
    }
    else {
        return false;
    }
};
exports.every = (preds, args, rest) => {
    // true by default, falsified if a check fails
    let passing = true;
    for (let idx = 0; idx < preds.length; idx++) {
        const pred = preds[idx];
        const last = idx === preds.length - 1;
        // if rest is false, ignore rest params,
        // otherwise pass it as an array to the last predicate
        const arg = last && rest ? args.slice(idx) : args[idx];
        if (!matcherCache.get(pred)) {
            if (!exports.check(pred, arg)) {
                if (last)
                    return passing;
                passing = false;
            }
        }
    }
    return passing;
};
//# sourceMappingURL=common.js.map