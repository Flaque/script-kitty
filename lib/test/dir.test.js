const dir = require("../dir");
const jetpack = require("fs-jetpack");
const tmp = require("tmp");
tmp.setGracefulCleanup();

describe("dir", () => {
  it("should be defined", () => {
    expect(dir).toBeDefined();
  });

  it("should have a readScripts", () => {
    expect(dir.readScripts).toBeDefined();
  });

  it("should fail if there's no scripts folder", () => {
    expect(() => {
      dir.readScripts("haha-i-dont-exist");
    }).toThrow();
  });

  it("should read a list of files", () => {
    const tmpobj = tmp.dirSync();

    jetpack
      .dir(tmpobj.name)
      .file("foo.js", { content: "js" })
      .file("bar.sh", { content: "bar" });

    // Read the scripts and show that they're working correctly
    const scripts = dir.readScripts(tmpobj.name);
    expect(scripts).toBeDefined();
    expect(scripts.foo).toBe(`node ./${tmpobj.name}/foo.js`);
    expect(scripts.bar).toBe(`./${tmpobj.name}/bar.sh`);

    // clean up and ignore errors
    try {
      tmpobj.removeCallback();
    } catch (err) {}
  });
});
