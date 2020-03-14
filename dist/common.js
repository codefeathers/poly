"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matcherCache = new WeakMap();
exports.check = (pred, arg, spread = false) => {
    if (spread) {
        if (pred(...arg))
            return true;
    }
    else if (pred(arg)) {
        matcherCache.set(pred, arg);
        return true;
    }
    else {
        return false;
    }
};
exports.slice = (xs, idx) => {
    const fromCache = matcherCache.get(xs);
    if (fromCache) {
        return fromCache;
    }
    else {
        const x = xs.slice(idx);
        matcherCache.set(xs, x);
        return x;
    }
};
exports.every = (preds, args) => {
    // true by default, falsified if a check fails
    let passing = true;
    for (let idx = 0; idx < preds.length; idx++) {
        const pred = preds[idx];
        const last = idx === preds.length - 1;
        const rest = last ? args.slice(idx) : null;
        if (!matcherCache.get(pred)) {
            const checked = last
                ? exports.check(pred, exports.slice(args, idx), true) // spread the args if this is the last check
                : exports.check(pred, args[idx]); // normally pass the next arg
            if (!checked) {
                if (last)
                    return passing;
                passing = false;
            }
        }
    }
    return passing;
};
//# sourceMappingURL=common.js.map