var assert = require("chai").assert;

var buildDocumentVector = require("../src/buildDocumentVector");

describe("buildDocumentVector", function() {

  it("build document vector", function() {
    var vector = buildDocumentVector("c a a", ["a", "b", "c", "d"]);
    assert.deepEqual(vector, [2/3, 0, 1/3, 0]);
  });

});