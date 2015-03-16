//var saveDirtyAndCleanPage = require("./saveDirtyAndCleanPage");
//
//var url = process.argv[2];
//saveDirtyAndCleanPage(url, function() {
//  console.log("save dirty and clean page - done");
//});

var downloadPage = require("./downloadPage.js");
var cleanHtml = require("./cleanHtml.js");
var getTopWords = require("./getTopWords.js");
var url = process.argv[2];
downloadPage(url, function(html) {
  var content = cleanHtml(html);
  console.time();
  var top = getTopWords(content, 5);
  for(var i = 0; i < top.length; i++)
    console.log(top[i]);
  console.timeEnd();
});
