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
		for (const overload of overloads) {
			const [preds, target] = overload;
			if (every(preds, args)) {
				return target(...args);
			}
		}

		throw new Error("The parameters passed did not match any of the overloads.");
	}) as any;

const f = poly(
	//
	[[r.string], (x: string) => "hello" + x],
	//
	[[r.number, r.number], (x: number) => x + 1],
	//
	[[r.number, r.number], (x: number, y: number) => x + y],
);
