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
import { PredicatesToGuards, UnionToIntersection } from "@codefeathers/runtype/util";

type AnyFunction = (...args: any) => any;

const predicates = [r.string, r.number] as const;

export const poly = <
	Target extends AnyFunction,
	Predicates extends Predicate[],
	Overload extends [Predicates, (...args: PredicatesToGuards<Predicates>) => any],
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

			let passing = true;
			// TODO: fix, hasRest only works for >1 rest args,
			// but should work for 0 or many
			const hasRest = args.length > preds.length;

			for (let idx = 0; idx < preds.length; idx++) {
				const pred = preds[idx];
				const last = idx === preds.length - 1;

				// TODO: cache check results
				const checked = last && hasRest ? pred(args.slice(idx)) : pred(args[idx]);
				if (!checked) {
					passing = false;
					break; // don't check any more types
				}
			}

			if (passing) {
				return target(...args);
			}
		}

		throw new Error("The parameters passed did not match any of the overloads.");
	}) as any;

const f = poly(
	//
	[[r.string], (x: string) => x],
	[[r.number, r.number], (x: number, y: number) => x + 5],
	[[r.string, r.Array(r.number)], (x: string, ...ys: number[]) => [x, ys]],
);
