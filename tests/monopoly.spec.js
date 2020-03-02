// monopoly(
// 	[x => x, x => typeof x === "string"],
// 	// @ts-ignore
// 	(x, y) => console.log(x, y),
// )(5, 5);

const t = require("tcomb-validation");

const wrap = x => x;

const r = wrap(t);

console.log(t.validate([], t.String).isValid());
