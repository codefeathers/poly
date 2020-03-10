const { monopoly } = require("./dist/index");

const f = (x, y, z, t) => {
	console.log({ x, y, z, t });
};

const monoF = monopoly(
	[
		x => typeof x === "string",
		x => typeof x === "number",
		xs => xs.every(x => typeof x === "number"),
	],
	f,
);

monoF("hello", 5, 5, 10);
monoF("5", {});
monoF({});
