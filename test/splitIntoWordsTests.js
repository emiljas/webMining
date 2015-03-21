var assert = require("chai").assert;
var splitIntoWords = require("../src/splitIntoWords");

describe("splitIntoWords", function() {
  it("split text into words", function () {
    var words = splitIntoWords("a b c");
    assert.deepEqual(words, ["a", "b", "c"]);
  });

  it("exclude empty words", function() {
    var words = splitIntoWords("a  b c");
    assert.deepEqual(words, ["a", "b", "c"]);
  });
});