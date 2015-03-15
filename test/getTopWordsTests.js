var assert = require("chai").assert;

var getTopWords = require("../src/getTopWords");

describe("getTopWords", function() {

  it("get top words", function() {
    var words = getTopWords("a a b a b c a");

    assert.equal(words.length, 3);

    assert.equal(words[0].word, "a");
    assert.equal(words[0].n, 4);

    assert.equal(words[1].word, "b");
    assert.equal(words[1].n, 2);

    assert.equal(words[2].word, "c");
    assert.equal(words[2].n, 1);
  });

  it("get k top words", function() {
    var words = getTopWords("a a b a b c a", 2);

    assert.equal(words.length, 2);

    assert.equal(words[0].word, "a");
    assert.equal(words[0].n, 4);

    assert.equal(words[1].word, "b");
    assert.equal(words[1].n, 2);
  });

  it("get k top words with min. 4 occurrences", function() {
    var words = getTopWords("a a b a b c a", 2, 4);

    assert.equal(words.length, 1);

    assert.equal(words[0].word, "a");
    assert.equal(words[0].n, 4);
  });

});