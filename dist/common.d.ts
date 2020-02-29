export declare type Pred = (...x: any) => boolean;
export declare type Match = [Pred[], Function];
export declare const check: (pred: Function, arg: any) => boolean;
export declare const every: (preds: ((...args: any) => boolean)[], args: any[], rest: boolean) => boolean;
//# sourceMappingURL=common.d.ts.map