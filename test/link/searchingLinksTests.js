var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var assert = chai.assert;
var nock = require("nock");
var url = require("url");
var searchingLinks = require("../../src/link/searchingLinks");

var downloadPage = require("../../src/downloadPage");

//var pages = {};
//pages[ROOT]
//   = linkTo("/a") + linkTo("/b") + linkTo("http://www.external.com/y");
//pages[A]
//   = linkTo("/a") + linkTo("/b") + link;
//pages[B]
//   = "";
//pages[C]
//   = linkTo("http://www.external.com/z");
//pages[X]
//   = linkTo("/c");
//pages[Y]
//   = linkTo("http://www.external.com/x") + linkTo("http://www.external.com/y");
//pages[Z]
//   = "";

//var pageWithHash = {};
//pageWithHash[ROOT]
//  = linkTo("#a");

var ROOT = "http://www.internal.com";
var A = "http://www.internal.com/a";
var B = "http://www.internal.com/b";
var C = "http://www.internal.com/c";

var X = "http://www.external.com/x";
var Y = "http://www.external.com/y";
var Z = "http://www.external.com/z";

var emptyPage   = {};
emptyPage[ROOT] = "";

var pages   = {};
pages[ROOT] = linkTo("/a");
pages[A]    = linkTo("/b") + linkTo("/c");
pages[B]    = "";
pages[C]    = "";

describe("searchingLinks", function() {
  beforeEach(function() {
    nock.cleanAll();
  });

  it("returns empty model if empty page", function(done) {
    mockUrls(emptyPage);

    var result = searchingLinks(ROOT);
    assert.eventually.deepEqual(result, {
           internal: [],
           external: []
    }).notify(done);
  });

  it("searches for internal links", function(done) {
    mockUrls(pages);

    var result = searchingLinks(ROOT);
    assert.eventually.deepEqual(result, {
      internal: [A, B, C],
      external: []
    }).notify(done);
  });

  //TODO: breaks links
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
