const { getExt } = require("../util");

test("getExt can get a correct extension", () => {
  expect(getExt("test.foo.js")).toBe(".js");
});
