import { Predicate } from "./common";
declare type AnyFunction = (...args: any) => any;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare const poly: <Target extends AnyFunction, Overload extends [Predicate[], Target], Overloads extends Overload[], PolyFunction extends UnionToIntersection<Overloads[number][1]>>(...overloads: Overloads) => PolyFunction;
export {};
//# sourceMappingURL=poly.d.ts.map