declare type Primitive = string | number | bigint | boolean | symbol | undefined | null;
declare type NonPrimitive = (<T extends any[], U>(...args: T) => U) | any[] | object;
declare type Any = Primitive | NonPrimitive;
declare const isPrimitive: (value: any) => value is Primitive;
declare class MapTree {
    childBranches: WeakMap<NonPrimitive, MapTree>;
    private primitiveKeys;
    hasValue: boolean;
    value: Any;
    constructor();
    private thisHas;
    private thisGet;
    private createKey;
    private resolveBranch;
    private setValue;
    clear(keys?: Any[]): void;
    set<T extends Any[], U extends Any>(args: T, value: U): U;
    get<T extends Any[]>(args: T): Any;
}
declare const map: MapTree;
declare const args: number[];
//# sourceMappingURL=weakMapTree.d.ts.map