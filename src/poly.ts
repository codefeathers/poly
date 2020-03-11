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
import r from "@codefeathers/runtype";

type AnyFunction = (...args: any) => any;

type r = typeof r;

type GuardedType<T> = T extends (x: any) => x is infer T ? T : never;

// Maps array/tuple
type MapGuards<T> = { [K in keyof T]: GuardedType<T[K]> };

// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
// How does it work? Blessed if I knew
type UnionToIntersection<U> = (U extends any
	? (k: U) => void
	: never) extends (k: infer I) => void
	? I
	: never;

// type Predicate<T extends any> = (x: any) => x is T;

type Target<T extends Predicate[], Return> = (...args: MapGuards<T>) => Return;

export const poly = <
	Predicates extends Predicate[],
	Return extends any,
	Overload extends [Predicates, Target<Predicates, Return>],
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
				return target(...args);
			}
		}

		throw new Error("The parameters passed did not match any of the overloads.");
	}) as any;

poly([[r.string], x => x], [[r.number], x => x]);

poly([[r.string], x => x]);

type F = [(args: string) => ((x: any) => x is string)[], (args: never) => (x: string) => string];
