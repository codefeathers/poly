export declare type Predicate = (x: any) => boolean;
export declare const check: (pred: Predicate, arg: any, rest?: boolean) => boolean | undefined;
export declare const slice: (xs: any[], idx: number) => any;
export declare const every: (preds: Predicate[], args: any[]) => boolean;
//# sourceMappingURL=common.d.ts.map