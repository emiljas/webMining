var assert = require("chai").assert;
var nock = require("nock");
var iconv = require("iconv-lite");

var downloadPage = require("../src/downloadPage.js");

var testDomain = "http://www.testDomain.com";

describe("downloadPage", function() {
  it("return page body", function(done) {
    mockTestDomainRequest("html");

    downloadPage(testDomain, function(html) {
      assert.equal(html, "html");
      done();
    });
  });

  it("change encoding to utf8", function(done) {
    var win1250Html = "ąół";
    win1250Html = iconv.encode(win1250Html, "windows-1250");

    mockTestDomainRequest(win1250Html, {
       "Content-Type": "text/html; charset=windows-1250"
    });

    downloadPage(testDomain, function(html) {
      assert.equal(html, "ąół");
      done();
    });
  });

  function mockTestDomainRequest(body, headers) {
    nock(testDomain)
       .get("/")
       .reply(200, body, headers);
  }
});