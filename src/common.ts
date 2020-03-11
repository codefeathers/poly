const matcherCache = new WeakMap();

export type Predicate = (...x: any) => boolean;

export const check = (pred: Function, arg: any, spread = false) => {
	if (spread) {
		if (pred(...arg)) return true;
	} else if (pred(arg)) {
		matcherCache.set(pred, arg);
		return true;
	} else {
		return false;
	}
};

export const slice = (xs: any[], idx: number) => {
	const fromCache = matcherCache.get(xs);

	if (fromCache) {
		return fromCache;
	} else {
		const x = xs.slice(idx);
		matcherCache.set(xs, x);
		return x;
	}
};

export const every = (preds: ((...args: any) => boolean)[], args: any[]) => {
	// true by default, falsified if a check fails
	let passing = true;

	for (let idx = 0; idx < preds.length; idx++) {
		const pred = preds[idx];
		const last = idx === preds.length - 1;

		if (!matcherCache.get(pred)) {
			const checked = last
				? check(pred, slice(args, idx), true) // spread the args if this is the last check
				: check(pred, args[idx]); // normally pass the next arg
			if (!checked) {
				if (last) return passing;
				passing = false;
			}
		}
	}

	return passing;
};
