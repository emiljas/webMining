var fs = require("fs");
var path = require("path");
var iconv = require('iconv-lite');
var cleanHtml = require("./cleanHtml.js");
var request = require("request");
var charsetDetector = require("node-icu-charset-detector");

var tmpDirtyPagePath = path.resolve(process.cwd(), "tmp/dirtyPage.html");
var tmpCleanPagePath = path.resolve(process.cwd(), "tmp/cleanPage.html");

var url = process.argv[2];

request.get({
      uri: url,
      encoding: null
    },
    function (err, res, body) {
      var encoding = charsetDetector.detectCharset(body).toString();

      var content = iconv.decode(body, encoding);

      saveToFile(tmpDirtyPagePath, content);

      content = cleanHtml(content);

      saveToFile(tmpCleanPagePath, content);
    }
);

function saveToFile(path, content) {
  fs.writeFile(path, content, function (err) {
    if (err)
      console.log(err);
    else
      console.log("The file was saved!");
  });
}
