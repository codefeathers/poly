export declare type Pred = (...x: any) => boolean;
export declare const check: (pred: Function, arg: any, spread?: boolean) => boolean | undefined;
export declare const slice: (xs: any[], idx: number) => any;
export declare const every: (preds: ((...args: any) => boolean)[], args: any[]) => boolean;
//# sourceMappingURL=common.d.ts.map