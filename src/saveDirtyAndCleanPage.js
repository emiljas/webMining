var path = require("path");
var fs = require("fs");

var downloadPage = require("./downloadPage");
var cleanHtml = require("./cleanHtml");


var tmpDirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
var tmpCleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.txt");

function saveDirtyAndCleanPage(url, callback) {
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
