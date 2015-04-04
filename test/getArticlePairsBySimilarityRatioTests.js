var assert = require("chai").assert;
var proxyquire = require("proxyquire");
var sinon = require("sinon");

var getArticlePairsBySimilarityRatio
   = require("../src/getArticlePairsBySimilarityRatio");
var ComparableDocument = require("../src/ComparableDocument");

describe("getArticlePairsBySimilarityRatio", function() {

  it("compare all combinations", function() {
    var a = makeDocument("a");
    var b = makeDocument("b");
    var c = makeDocument("c");
    var compareDocumentsSpy = sinon.spy();
    var getArticlePairsBySimilarityRatio = proxyquire("../src/getArticlePairsBySimilarityRatio", {
      "./compareDocuments": compareDocumentsSpy
    });
    getArticlePairsBySimilarityRatio([a, b, c], 0, "desc");

    assert.isTrue(compareDocumentsSpy.calledWithExactly("a", "b"));
    assert.isTrue(compareDocumentsSpy.calledWithExactly("a", "c"));
    assert.isTrue(compareDocumentsSpy.calledWithExactly("b", "c"));
  });

  it("returns pairs descending", function() {
    var documents = [
      makeDocument("kota ma ala"),
      makeDocument("pies"),
      makeDocument("ala ma kota"),
      makeDocument("ala ma psa")
    ];

    var pairs = getArticlePairsBySimilarityRatio(documents, 2, "desc");

    assert.equal(pairs[0].document1, documents[0]);
    assert.equal(pairs[0].document2, documents[2]);

    assert.equal(pairs[1].document1, documents[0]);
    assert.equal(pairs[1].document2, documents[3]);
  });

  it("returns pairs ascending", function() {
    var documents = [
      makeDocument("kota ma ala"),
      makeDocument("pies"),
      makeDocument("ala ma kota"),
      makeDocument("ala ma psa")
    ];

    var pairs = getArticlePairsBySimilarityRatio(documents, 2, "asc");

    assert.equal(pairs[0].document1, documents[0]);
    assert.equal(pairs[0].document2, documents[1]);

    assert.equal(pairs[1].document1, documents[1]);
    assert.equal(pairs[1].document2, documents[2]);
  });

  function makeDocument(text) {
    var document = new ComparableDocument();
    document.text = text;
    return document;
  }

});