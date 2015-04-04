var cheerio = require("cheerio");

var downloadPage = require("./downloadPage");
var cleanHtml = require("./cleanHtml");

function gettingWikipediaArticle(article) {
  return new Promise(function(resolve, reject) {
    downloadPage(article.link, function(content) {
      var $ = cheerio.load(content);
      article.text = $("#content").html();
      resolve(article);
    })
  });
}

module.exports = gettingWikipediaArticle;