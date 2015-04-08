var assert = require("chai").assert;
var sortLinksByOrigin = require("../../src/link/sortLinksByOrigin");

describe("sortLinksByOrigin", function() {
  it("sort links by origin", function() {
    var result = sortLinksByOrigin([
      "http://www.google.com",
      "http://www.yahoo.com",
      "https://google.com/a/b/c",
      "http://www.google.com?a=2",
      //"http://www.search.google.com",
      "https://yahoo.com/homepage"
    ], "http://www.google.com");

    assert.deepEqual(result, {
      internal: [
        "http://www.google.com",
        "https://google.com/a/b/c",
        "http://www.google.com?a=2",
        //"http://www.search.google.com"
      ],
      external: [
        "http://www.yahoo.com",
        "https://yahoo.com/homepage"
      ]
    })
  });

  it("search.google.com is internal of google.com", function() {
    var result = sortLinksByOrigin([
       "http://search.google.com"
    ], "http://www.google.com");
    assert.deepEqual(result, {
      internal: ["http://search.google.com"],
      external: []
    });
  });

  it("treat relative link as internal", function() {
    var result = sortLinksByOrigin(["/search", "file.pdf"], "http://www.google.com");
    assert.deepEqual(result, {
      internal: ["http://www.google.com/search", "http://www.google.com/file.pdf"],
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