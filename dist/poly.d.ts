import { Predicate } from "./common";
declare type GuardedType<T> = T extends (x: any) => x is infer T ? T : never;
declare type MapGuards<T> = {
    [K in keyof T]: GuardedType<T[K]>;
};
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
declare type Target<T extends Predicate[], Return> = (...args: MapGuards<T>) => Return;
export declare const poly: <Predicates extends Predicate[], Return extends any, Overload extends [Predicates, Target<Predicates, Return>], Overloads extends Overload[], PolyFunction extends UnionToIntersection<Overloads[number][1]>>(...overloads: Overloads) => PolyFunction;
export {};
//# sourceMappingURL=poly.d.ts.map