var assert = require("chai").assert;

var buildDocumentVector = require("../src/buildDocumentVector");

describe("DocumentVector", function() {

  it("build document vector", function() {
    var vector = buildDocumentVector("c a a", ["a", "b", "c", "d"]);
    assert.equal(vector.length, 4);
    assert.equal(vector[0], 2/3);
    assert.equal(vector[1], 0);
    assert.equal(vector[2], 1/3);
    assert.equal(vector[3], 0);
  });

});