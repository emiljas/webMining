//var saveDirtyAndCleanPage = require("./saveDirtyAndCleanPage");
//
//var url = process.argv[2];
//saveDirtyAndCleanPage(url, function() {
//  console.log("save dirty and clean page - done");
//});





//var downloadPage = require("./downloadPage.js");
//var cleanHtml = require("./cleanHtml.js");
//var getTopWords = require("./getTopWords.js");
//var url = process.argv[2];
//downloadPage(url, function(html) {
//  var content = cleanHtml(html);
//  console.time();
//  var top = getTopWords(content, 5);
//  for(var i = 0; i < top.length; i++)
//    console.log(top[i]);
//  console.timeEnd();
//});





//var downloadPage = require("./downloadPage");
//var wikipediaArticles = require("./wikipediaArticles");
//var getArticlePairsBySimilarityRatio = require("./getArticlePairsBySimilarityRatio");
//var gettingWikipediaArticle = require("./gettingWikipediaArticle");
//var gettingWikipediaArticlesPromises = [];
//for(var i = 0; i < wikipediaArticles.length; i++) {
//  var article = wikipediaArticles[i];
//  gettingWikipediaArticlesPromises.push(gettingWikipediaArticle(article))
//}
//Promise.all(gettingWikipediaArticlesPromises).then(function(articles) {
//  var pairs = getArticlePairsBySimilarityRatio(articles, 10, "desc");
//  console.log("desc");
//  pairsToString(pairs);
//
//  console.log();
//  console.log("asc");
//
//  pairs = getArticlePairsBySimilarityRatio(articles, 10, "asc");
//  pairsToString(pairs);
//});
//
//function pairsToString(pairs) {
//  pairs.forEach(function(pair) {
//    console.log(
//       pair.document1.toString() +
//       " " +
//       pair.document2.toString() +
//       " " +
//       pair.similarityRatio);
//  });
//}






var fs = require("fs");
var path = require("path");
var url = process.argv[2];
var searchingLinks = require("./link/searchingLinks");
searchingLinks(url, {
  maxRecursionLevel: 2
}).then(function(result) {

  console.log("internal: " + result.internal.length);
  console.log("e.g. "      + result.internal[0]);
  console.log("external: " + result.external.length);
  console.log("e.g. "      + result.external[0]);
  console.log("errors: "   + result.logs.length);

  console.log();

  //result.logs.forEach(function(log) {
  //  console.log(log);
  //});

  //if(result.logs.length > 0)
  //  console.log("e.g. "    + result.logs[0].url);

  //console.log(links, "WORKS");
  //fs.writeFile(path.resolve(process.cwd(), "tmp/internalLinks.txt"), links.internal, function (err) {
  //  console.log("save 1");
  //});
  //fs.writeFile(path.resolve(process.cwd(), "tmp/externalLinks.txt"), links.external, function (err) {
  //  console.log("save 2");
  //});
}).catch(function() {
  console.log("CATCH");
});
