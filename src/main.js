var http = require("http");
var fs = require("fs");
var path = require("path");
var cleanHtml = require("./cleanHtml.js");

var tmpDirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
var tmpCleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.html");

var req = http.get("http://stackoverflow.com/questions/23004520/code-wrap-intellij", function(res) {
  var content = "";

  res.on("data", function (data) {
    content += data;
  });

  res.on("end", function () {

    saveToFile(tmpDirtyPagePath, content);

    content = cleanHtml(content);

    saveToFile(tmpCleanPagePath, content);
  });

  function saveToFile(path, content) {
    fs.writeFile(path, content, function(err) {
      if(err)
        console.log(err);
      else
        console.log("The file was saved!");
    });
  }
});
