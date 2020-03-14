type Primitive = string | number | bigint | boolean | symbol | undefined | null;
type NonPrimitive = (<T extends any[], U>(...args: T) => U) | any[] | object;

type Any = Primitive | NonPrimitive;

const isPrimitive = (value: any): value is Primitive =>
	(typeof value !== "object" && typeof value !== "function") || value === null;

class MapTree {
	public childBranches: WeakMap<NonPrimitive, MapTree>;
	private primitiveKeys: Map<Primitive, {}>;
	public hasValue: boolean;
	public value: Any;

	constructor() {
		this.childBranches = new WeakMap();
		this.primitiveKeys = new Map();
		this.hasValue = false;
		this.value = undefined;
	}

	private thisHas(key: Any) {
		const keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
		return keyObject ? this.childBranches.has(keyObject) : false;
	}

	private thisGet(key: Any) {
		const keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
		return keyObject ? this.childBranches.get(keyObject) : undefined;
	}

	private createKey(key: Any) {
		if (isPrimitive(key)) {
			const keyObject = {};
			this.primitiveKeys.set(key, keyObject);
			return keyObject;
		}
		return key;
	}

	private resolveBranch(key: Any) {
		if (this.thisHas(key)) {
			// this.thisHas has ensured that a child for key exists
			// safe to assert MapTree
			return this.thisGet(key) as MapTree;
		}
		const newBranch = new MapTree();
		const keyObject = this.createKey(key);
		this.childBranches.set(keyObject, newBranch);
		return newBranch;
	}

	private setValue(value: Any) {
		this.hasValue = true;
		return (this.value = value);
	}

	clear(keys: Any[] = []) {
		if (keys.length === 0) {
			this.childBranches = new WeakMap();
			this.primitiveKeys.clear();
			this.hasValue = false;
			this.value = undefined;
		} else if (keys.length === 1) {
			const key = keys[0];
			if (isPrimitive(key)) {
				const keyObject = this.primitiveKeys.get(key);
				if (keyObject) {
					this.childBranches.delete(keyObject);
					this.primitiveKeys.delete(key);
				}
			} else {
				this.childBranches.delete(key);
			}
		} else {
			const childKey = keys[0];
			const childBranch = this.thisGet(childKey);
			if (childBranch) {
				childBranch.clear(keys);
			}
		}
	}

	set<T extends Any[], U extends Any>(args: T, value: U) {
		const argsTree = new MapTree();
		const branch = args.reduce(function getBranch(parentBranch: MapTree, arg) {
			return parentBranch.resolveBranch(arg);
		}, argsTree);

		branch.value = value;
		return value;
	}

	get<T extends Any[]>(args: T) {
		const argsTree = new MapTree();
		const branch = args.reduce(function getBranch(parentBranch: MapTree, arg) {
			return parentBranch.resolveBranch(arg);
		}, argsTree);

		return branch.value;
	}
}

const map = new MapTree();

const args = [1, 2, 3];
map.set(args, 5);

console.log(map.get(args));
