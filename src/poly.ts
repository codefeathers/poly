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

import { Match, every } from "./common";

export const poly = (matchers: { [k: string]: Match }, { rest = false } = {}) => (
	...args: any[]
) => {
	for (const matcher in matchers) {
		const [preds, target] = matchers[matcher];
		if (every(preds, args, rest)) {
			return target(...args);
		}
	}
};
