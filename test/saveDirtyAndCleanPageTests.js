var assert = require("chai").assert;
var mockFs = require("mock-fs");
var fs = require("fs");
var path = require("path");
var sinon = require("sinon");
var proxyquire = require("proxyquire");

var testAddress = "http://www.google.pl";
var pageHtml = "<html>content</html>";
var cleanPageHtml = "content";
var dirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
var cleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.txt");

describe("saveDirtyAndCleanPage", function() {

  it("downloadPage is called once", function() {
    var downloadPage = sinon.spy();
    var saveDirtyAndCleanPage = proxyquire("../src/saveDirtyAndCleanPage.js", {
      "./downloadPage": downloadPage,
      "./cleanHtml": function () {}
    });

    mockFs(dirtyPagePath, cleanPagePath);

    saveDirtyAndCleanPage(testAddress, function() {});

    assert.isTrue(downloadPage.calledOnce);
    assert.isTrue(downloadPage.calledWith(testAddress));
  });

  it("dirty page is saved to file", function(done) {
    var saveDirtyAndCleanPage = proxyquire("../src/saveDirtyAndCleanPage.js", {
      "./downloadPage": downloadPage,
      "./cleanHtml": cleanHtml
    });

    mockTmpDir();
    saveDirtyAndCleanPage(testAddress, function() {
        fs.readFile(dirtyPagePath, function(err, content) {
          assert.equal(content, pageHtml);
          done();
        });
    });
  });

  it("clean page is saved to file", function(done) {
    var saveDirtyAndCleanPage = proxyquire("../src/saveDirtyAndCleanPage.js", {
      "./downloadPage": downloadPage,
      "./cleanHtml": cleanHtml
    });

    mockTmpDir();
    saveDirtyAndCleanPage(testAddress, function() {
      fs.readFile(cleanPagePath, function(err, content) {
        assert.equal(content, cleanPageHtml);
        done();
      });
    });
  });

  function downloadPage(url, callback) {
    callback(pageHtml);
  }

  function cleanHtml(html) {
    return cleanPageHtml;
  }

  function mockTmpDir() {
    var mockedDirs = {};
    mockedDirs[path.resolve(process.cwd(), "tmp")] = {};
    mockFs(mockedDirs);
  }

  afterEach(function(){
    mockFs.restore();
  })
});