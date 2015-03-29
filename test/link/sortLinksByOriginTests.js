var assert = require("chai").assert;
var sortLinksByOrigin = require("../../src/link/sortLinksByOrigin");

describe("sortLinksByOrigin", function() {
  it("sort links by origin", function() {
    var result = sortLinksByOrigin([
      "http://www.google.com",
      "http://www.yahoo.com",
      "https://www.google.com/a/b/c",
      "http://www.google.com?a=2",
      "https://yahoo.com/homepage"
    ], "http://www.google.com");

    assert.deepEqual(result, {
      internal: [
        "http://www.google.com",
        "https://www.google.com/a/b/c",
        "http://www.google.com?a=2"
      ],
      external: [
        "http://www.yahoo.com",
        "https://yahoo.com/homepage"
      ]
    })
  });

  it("treat relative link as internal", function() {
    var result = sortLinksByOrigin(["/search"], "http://www.google.com");
    assert.deepEqual(result, {
      internal: ["http://www.google.com/search"],
      external: []
    })
  });

  it("delete invalid links", function() {
    var result = sortLinksByOrigin([undefined, "#", ""], "http://www.google.com");
    assert.deepEqual(result, {
      internal: [],
      external: []
    });
  });
});