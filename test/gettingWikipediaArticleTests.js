var chai = require("chai");
var assert = chai.assert;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var nock = require("nock");

var gettingWikipediaArticle = require("../src/gettingWikipediaArticle");
var ComperableDocument = require("../src/ComparableDocument");


describe("gettingWikipediaArticle", function() {

  var document = new ComperableDocument("http://fake.com", "informatyka");

  it("get text only from main div", function(done) {
    mockWikipediaArticle(
       "<html><body>" +
        "this is NOT article content" +
       "<div id='content'>article content</div>" +
       "</body></html>"
    );

    gettingWikipediaArticle(document).then(function(document) {
      assert.equal(document.text, "article content");
      done();
    }).catch(function(err) {
      done(err);
    });

  });

  function mockWikipediaArticle(html) {
    nock(document.link)
       .get("/")
       .reply(200, html);
  }

});

