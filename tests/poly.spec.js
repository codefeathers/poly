// poly({
// 	a: [[x => x, x => typeof x === "string"], () => console.log("a")],
// 	b: [[x => typeof x === "number"], () => console.log("b")],
// })(10);
const { poly } = require("../dist");

describe("", () => {
	it("should call the fist overload", () => {
		poly({
			a: [[]],
		});
	});
});
