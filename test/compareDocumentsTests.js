var assert = require("chai").assert;

var compareDocuments = require("../src/compareDocuments");

describe("compareDocuments", function() {

  it("same sentence", function() {
    var similarityRatio = compareDocuments("ala ma kota", "kota ala ma");
    assert.equal(similarityRatio, 1);
  });

  it("one empty sentance", function() {
    var similarityRatio = compareDocuments("", "ala ma kota");
    assert.equal(similarityRatio, 0);
  });

  it("empty sentences", function() {
    var similarityRatio = compareDocuments("", "");
    assert.equal(similarityRatio, 1);
  });

});