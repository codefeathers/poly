/*
monopoly(
	[t.String, t.String, t.T],
	(a, b) => // a and b are String
)
*/

import { Predicate, check } from "./common";

export const monopoly = (preds: Predicate[], target: Function) => (...args: any[]) => {
	const finalArgs = [];

	let predIdx = 0;
	for (let argIdx = 0; argIdx < args.length; argIdx++) {
		const pred = preds[predIdx];

		// no more predicates to go
		const last = predIdx === preds.length - 1;

		// stop iterating and accept the remaining as rest arguments
		// since we have no more predicates
		const arg = last ? args.slice(argIdx) : args[argIdx];
		if (last) argIdx = args.length;

		if (check(pred, arg)) {
			if (last) finalArgs.push(...arg);
			else finalArgs.push(arg);
			// only proceed to next predicate if an argument satisfies current
			++predIdx;
		} else {
			finalArgs.push(undefined);
			++predIdx;
		}
	}

	return target(...finalArgs);
};
