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

import { Predicate, every } from "./common";

type AnyFunction = (...args: any) => any;

// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
// How does it work? Blessed if I knew
type UnionToIntersection<U> = (U extends any
	? (k: U) => void
	: never) extends (k: infer I) => void
	? I
	: never;

export const poly = <
	Target extends AnyFunction,
	Overload extends [Predicate[], Target],
	Overloads extends Overload[],
	PolyFunction extends UnionToIntersection<Overloads[number][1]>
>(
	...overloads: Overloads
): PolyFunction =>
	// Not to worry, this is not actually `any`.
	// The type is inferred correctly at call-site
	((...args: any) => {
		for (const matcher in overloads) {
			const [preds, target] = overloads[matcher];
			if (every(preds, args)) {
				return target.call({ strategy: matcher }, ...args);
			}
		}

		throw new Error("The parameters passed did not match any of the overloads.");
	}) as any;
