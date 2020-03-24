import { Predicate } from "./common";
import { PredicatesToGuards } from "@codefeathers/runtype/dist/util";
declare type AnyFunction = (...args: any) => any;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare const poly: <Target extends AnyFunction, Predicates extends Predicate[], Overload extends [Predicates, (...args: PredicatesToGuards<Predicates>) => any], Overloads extends Overload[], PolyFunction extends UnionToIntersection<Overloads[number][1]>>(...overloads: Overloads) => PolyFunction;
export {};
//# sourceMappingURL=poly.d.ts.map