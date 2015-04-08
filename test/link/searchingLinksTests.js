var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var assert = chai.assert;
var nock = require("nock");
var url = require("url");
var searchingLinks = require("../../src/link/searchingLinks");

var downloadPage = require("../../src/downloadPage");

var ROOT = "http://www.internal.com/";
var A = "http://www.internal.com/a";
var B = "http://www.internal.com/b";
var C = "http://www.internal.com/c";

var X = "http://www.external.com/x";
var Y = "http://www.external.com/y";
var Z = "http://www.external.com/z";
var Q = "http://www.external.com/q";

describe("searchingLinks", function() {
  beforeEach(function() {
    nock.cleanAll();
  });

  it("returns empty model if empty page", function(done) {
    var emptyPage   = {};
    emptyPage[ROOT] = "";

    mockUrls(emptyPage);

    var searching = searchingLinks(ROOT);
    assert.eventually.deepEqual(searching, {
      internal: [],
      external: [],
      logs:     []
    }).notify(done);
  });

  it("searches for internal links", function(done) {
    var internalPages   = {};
    internalPages[ROOT] = linkTo("/a");
    internalPages[A]    = linkTo("/b") + linkTo("/c");
    internalPages[B]    = "";
    internalPages[C]    = "";

    mockUrls(internalPages);

    var searching = searchingLinks(ROOT);
    assert.eventually.deepEqual(searching, {
      internal: [A, B, C],
      external: [],
      logs:     []
    }).notify(done);
  });

  it("logs invalid links", function(done) {
    var searching = searchingLinks(ROOT);
    searching
       .then(function(result) {
         assert.equal(result.logs.length, 1);
         assert.equal(result.logs[0].url, ROOT);
         assert.include(result.logs[0].error, "Error");
         done();
       })
       .catch(function(err) {
         done(err);
       });
  });

  it("skip already visited pages", function(done) {
    var pagesWithLoop   = {};
    pagesWithLoop[ROOT] = linkTo("/");

    mockUrls(pagesWithLoop);

    var searching = searchingLinks(ROOT);
    assert.eventually.deepEqual(searching, {
      internal: [ROOT],
      external: [],
      logs:     []
    }).notify(done);
  });

  it("searches for external pages", function(done) {
    var externalPages   = {};
    externalPages[ROOT] = linkTo("/a");
    externalPages[A]    = linkTo(X) + linkTo("/b");
    externalPages[B]    = linkTo(Y) + linkTo(Z);
    externalPages[X]    = linkTo("/c") + linkTo(Q); //links from external pages are NOT saved
    externalPages[Y]    = "";

    mockUrls(externalPages);

    var searching = searchingLinks(ROOT);
    assert.eventually.deepEqual(searching, {
      internal: [A, B],
      external: [X, Y, Z],
      logs:     []
    }).notify(done);
  });

  it("can limit recursive level", function(done) {
    var pages   = {};
    pages[ROOT] = linkTo("/a") + linkTo(X);
    pages[A]    = linkTo("/b") + linkTo(Y);

    mockUrls(pages);

    var searching = searchingLinks(ROOT, {
      maxRecursionLevel: 1
    });
    assert.eventually.deepEqual(searching, {
      internal: [A],
      external: [X],
      logs:     []
    }).notify(done);
  });
});

function mockUrls(pages) {
  for(var url in pages)
    if(pages.hasOwnProperty(url))
      mockUrlToReturn(url, pages[url]);
}

function mockUrlToReturn(address, content) {
  var parsedUrl = url.parse(address);
  nock(parsedUrl.protocol + "//" + parsedUrl.host)
     .get(parsedUrl.pathname)
     .reply(200, content);
}

function linkTo(url) {
  return "<a href='" + url + "'>link</a>";
}
