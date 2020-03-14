"use strict";
const isPrimitive = value =>
	(typeof value !== "object" && typeof value !== "function") || value === null;
class MapTree {
	constructor() {
		this.childBranches = new WeakMap();
		this.primitiveKeys = new Map();
		this.hasValue = false;
		this.value = undefined;
	}
	thisHas(key) {
		const keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
		return keyObject ? this.childBranches.has(keyObject) : false;
	}
	thisGet(key) {
		const keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
		return keyObject ? this.childBranches.get(keyObject) : undefined;
	}
	createKey(key) {
		if (isPrimitive(key)) {
			const keyObject = {};
			this.primitiveKeys.set(key, keyObject);
			return keyObject;
		}
		return key;
	}
	resolveBranch(key) {
		if (this.thisHas(key)) {
			// this.thisHas has ensured that a child for key exists
			// safe to assert MapTree
			return this.thisGet(key);
		}
		const newBranch = new MapTree();
		const keyObject = this.createKey(key);
		this.childBranches.set(keyObject, newBranch);
		return newBranch;
	}
	setValue(value) {
		this.hasValue = true;
		return (this.value = value);
	}
	clear(keys = []) {
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
	set(args, value) {
		const argsTree = new MapTree();
		const branch = args.reduce(function getBranch(parentBranch, arg) {
			return parentBranch.resolveBranch(arg);
		}, argsTree);
		branch.value = value;
		return value;
	}
	get(args) {
		const argsTree = new MapTree();
		const branch = args.reduce(function getBranch(parentBranch, arg) {
			return parentBranch.resolveBranch(arg);
		}, argsTree);
		return branch.value;
	}
}
const map = new MapTree();
map.set([1, 2, 3], 5);
console.log(map.get([1, 2, 3]));
//# sourceMappingURL=weakMapTree.js.map
