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


var downloadPage = require("./downloadPage");
var wikipediaArticles = require("./wikipediaArticles");
var getArticlePairsBySimilarityRatio = require("./getArticlePairsBySimilarityRatio");
var gettingWikipediaArticle = require("./gettingWikipediaArticle");
var gettingWikipediaArticlesPromises = [];
for(var i = 0; i < wikipediaArticles.length; i++) {
  var article = wikipediaArticles[i];
  gettingWikipediaArticlesPromises.push(gettingWikipediaArticle(article))
}
Promise.all(gettingWikipediaArticlesPromises).then(function(articles) {
  var pairs = getArticlePairsBySimilarityRatio(articles, 10, "desc");
  console.log("desc");
  pairsToString(pairs);

  console.log();
  console.log("asc");

  pairs = getArticlePairsBySimilarityRatio(articles, 10, "asc");
  pairsToString(pairs);
});

function pairsToString(pairs) {
  pairs.forEach(function(pair) {
    console.log(
       pair.document1.toString() +
       " " +
       pair.document2.toString() +
       " " +
       pair.similarityRatio);
  });
}