import { Predicate } from "./common";
declare type Matchers<T> = {
    [k: string]: [Predicate[], T];
};
export declare const poly: <T extends (...x: any) => any>(matchers: Matchers<T>) => (...args: any[]) => any;
export {};
//# sourceMappingURL=poly.d.ts.map