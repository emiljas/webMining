var assert = require("chai").assert;
var mockFs = require("mock-fs");
var fs = require("fs");
var path = require("path");
var sinon = require("sinon");

//TODO:PROBLEM Z ZAPISEM DIRTY PAGE

var saveDirtyAndCleanPage = require("../src/saveDirtyAndCleanPage.js");

var testAddress = "http://www.google.pl";
var testPageHtml = "html";
var dirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
var cleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.txt");

describe("saveDirtyAndCleanPage", function() {
  it("downloadPage is called once", function() {
    mockFs(dirtyPagePath, cleanPagePath);

    var downloadPage = sinon.spy();
    saveDirtyAndCleanPage(testAddress, downloadPage, function() {});

    assert.isTrue(downloadPage.calledOnce);
    assert.isTrue(downloadPage.calledWith(testAddress));
  });

  it("dirty page is saved to file", function(done) {
    mockFs(dirtyPagePath, cleanPagePath);

    var downloadPage = function(url, callback) {
      return callback(testPageHtml);
    };
    var cleanHtml = function(html) {
      return html + " after cleaning";
    };
    saveDirtyAndCleanPage(testAddress, downloadPage, cleanHtml);

    setTimeout(function() {
      fs.readFile(dirtyPagePath, function(err, content) {
        assert.equal(testPageHtml, content);
        done();
      });
    }, 1000);
  });
});