const pkg = require("../pkg");
const jetpack = require("fs-jetpack");
const tmp = require("tmp");
tmp.setGracefulCleanup();

const readScripts = name => {
  return jetpack.read(name, "json").scripts;
};

describe("pkg", () => {
  it("is defined", () => {
    expect(pkg).toBeDefined();
  });

  it("has a writeScripts function", () => {
    expect(pkg.writeScripts).toBeDefined();
  });

  it("will error out if there's no package.json", () => {
    expect(() => {
      pkg.writeScripts(
        { blah: "node ./blah/foo.js" },
        "i-no-exist/package.json"
      );
    }).toThrow();
  });

  it("will write to a file if it's already there", () => {
    // Create a temporary file
    const tmpobj = tmp.fileSync();
    jetpack.write(tmpobj.name, { scripts: { nochange: "nochange" } });

    // sanity check
    expect(readScripts(tmpobj.name).nochange).toBe("nochange");

    // Modify scripts
    pkg.writeScripts({ test: "test" }, tmpobj.name);

    // Check that we didn't overwrite something we shouldn't
    expect(readScripts(tmpobj.name).nochange).toBe("nochange");

    // Check we added something
    expect(readScripts(tmpobj.name).test).toBe("test");

    // Clean up after ourselves
    tmpobj.removeCallback();
  });
});
