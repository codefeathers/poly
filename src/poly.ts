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

import { Pred, every } from "./common";

type Matchers<T> = {
	[k: string]: [Pred[], T];
};

export const poly = <T extends (...x: any) => any>(matchers: Matchers<T>) => (...args: any[]) => {
	for (const matcher in matchers) {
		const [preds, target] = matchers[matcher];
		if (every(preds, args)) {
			return target.call(matchers, ...args);
		}
	}

	throw new Error("The parameters passed did not match any of the overloads.");
};
