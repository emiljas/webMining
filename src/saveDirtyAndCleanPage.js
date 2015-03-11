var path = require("path");
var fs = require("fs");

var tmpDirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
var tmpCleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.txt");

function saveDirtyAndCleanPage(url, downloadPage, cleanHtml) {
  downloadPage(url, function(html) {
    saveToFile(tmpDirtyPagePath, html);
  });
}

//var fs = require("fs");
//var path = require("path");
//var cleanHtml = require("./cleanHtml.js");
//var downloadPage = require("./downloadPage.js");
//
//var tmpDirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
//var tmpCleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.html");
//
//var url = process.argv[2];
//
//downloadPage(url, function(html) {
//  saveToFile(tmpDirtyPagePath, html);
//
//  html = cleanHtml(html);
//
//  saveToFile(tmpCleanPagePath, html);
//});


function saveToFile(path, content) {
  fs.writeFile(path, content, function (err) {
    if (err)
      console.log(err);
    else
      console.log("The file was saved!");
  });
}

module.exports = saveDirtyAndCleanPage;
