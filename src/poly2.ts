import { every } from "./common";
import { Predicate, PredicatesToGuards, UnionToIntersection } from "@codefeathers/runtype/util";
type AnyFunction = (...args: any) => any;

const o = <
	Predicates extends readonly Predicate[],
	Overload extends (...args: PredicatesToGuards<Predicates>) => any
>(
	preds: Predicates,
	overload: Overload,
): ((...args: Parameters<Overload>) => () => ReturnType<Overload>) =>
	((...args: any) => {
		if (every(preds, args)) {
			return () => overload(...args);
		} else {
			return undefined;
		}
	}) as any;

const poly = <O extends ReturnType<typeof o>, Os extends O[]>(
	...os: Os
): UnionToIntersection<Os[number]> =>
	((...args: any) => {
		let target;

		for (const o of os) {
			const passed = o(args);
			if (passed[0]) {
				target = o;
				break;
			}
		}

		if (target) {
			return target(...args);
		} else {
			throw new Error("Parameters do not satisfy any of the overloads");
		}
	}) as any;

import r from "@codefeathers/runtype";

const x = o([r.string, r.number] as const, (x, y) => x + y);

const f = poly(x);
