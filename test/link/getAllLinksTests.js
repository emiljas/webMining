var assert = require("chai").assert;
var getAllLinks = require("../../src/link/getAllLinks");

describe("getAllLinks", function() {
  it("return 0 links if empty page", function() {
    var links = getAllLinks();
    assert.equal(links.length, 0);
  });

  it("return all links", function() {
    var html =
      "<a href='http://www.yahoo.com'>yahoo</a> \
      <div> \
        <a href='http://www.google.com'>google</a> \
      </div>";

    var links = getAllLinks(html);
    assert.deepEqual(links, [
      "http://www.yahoo.com",
      "http://www.google.com"
    ]);
  });
});
