var path = require("path");
var fs = require("fs");

var tmpDirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
var tmpCleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.txt");

function saveDirtyAndCleanPage(url, callback, downloadPage, cleanHtml) {
  if(downloadPage === undefined)
    downloadPage = require("./downloadPage.js")
  if(cleanHtml === undefined)
    cleanHtml = require("./cleanHtml.js");

  downloadPage(url, function(html) {
    saveToFile(tmpDirtyPagePath, html, function() {
      saveToFile(tmpCleanPagePath, cleanHtml(html), function() {
        callback();
      });
    });
  });
}

function saveToFile(path, content, callback) {
  fs.writeFile(path, content, function (err) {
    callback();
  });
}

module.exports = saveDirtyAndCleanPage;
