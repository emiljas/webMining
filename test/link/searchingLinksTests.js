var chai = require("chai");
var assert = chai.assert;
var nock = require("nock");
var url = require("url");
var searchingLinks = require("../../src/link/searchingLinks");

var ROOT = "http://www.internal.com";
var A = "http://www.internal.com/a";
var B = "http://www.internal.com/b";
var C = "http://www.internal.com/c";

var X = "http://www.external.com/x";
var Y = "http://www.external.com/y";
var Z = "http://www.external.com/z";

var pages = {};
pages[ROOT]
   = linkTo("/a") + linkTo("/b") + linkTo("http://www.external.com/y");
pages[A]
   = linkTo("/a") + linkTo("/b");
pages[B]
   = "";
pages[C]
   = linkTo("http://www.external.com/z");
pages[X]
   = linkTo("/c");
pages[Y]
   = linkTo("http://www.external.com/x") + linkTo("http://www.external.com/y");
pages[Z]
   = "";

describe("recursiveSearchLinks", function() {
  it("recursive search links", function(done) {
    mockUrls(pages);

    searchingLinks(ROOT, ROOT, 10)
       .then(function(links) {
         assert.deepEqual(links, {
           internal: [A, B, C],
           external: [Y, X, Z]
         });
         done();
       })
       .catch(function(err) {
         done(err);
       });
  });

  it("recursive search links with recursive limit", function(done) {
    mockUrls(pages);

    searchingLinks(ROOT, ROOT, 1)
       .then(function(links) {
         assert.deepEqual(links, {
           internal: [A, B],
           external: [Y]
         });
         nock.cleanAll();
         done();
       })
       .catch(function(err) {
         nock.cleanAll();
         done(err);
       });
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
