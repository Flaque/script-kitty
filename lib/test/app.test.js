const app = require("../app");
const tmp = require("tmp");
const jetpack = require("fs-jetpack");

describe("app", () => {
  test("it exists", () => {
    expect(app).toBeDefined();
  });

  test("it has an 'update' method", () => {
    expect(app.update).toBeDefined();
  });

  test("it has an update method that throws an error if the path doesn't exist", () => {
    expect(() => {
      app.update("no-no-exist-no-i-dont");
    }).toThrow();
  });

  test("it can update a package.json based on some scripts", () => {
    const tmpobj = tmp.dirSync();

    /**
     * Create a file structure like this:
     * tmpDir 
     *   - package.json
     *   - scripts
     *     - test.js
     */
    jetpack
      .dir(tmpobj.name)
      .file("package.json", {
        content: { scripts: { nochange: "./nochange" } }
      })
      .dir("scripts")
      .file("test.js", {
        content: "test"
      })
      .file("bash.sh", {
        content: "bash"
      });

    // Update the directory
    app.update(tmpobj.name, "scripts");

    // Check there's a new test script
    expect(
      jetpack.read(`${tmpobj.name}/package.json`, "json").scripts.test
    ).toBe(`node ./${tmpobj.name}/scripts/test.js`);

    // Check there's a new bash script
    expect(
      jetpack.read(`${tmpobj.name}/package.json`, "json").scripts.bash
    ).toBe(`./${tmpobj.name}/scripts/bash.sh`);
  });
});
