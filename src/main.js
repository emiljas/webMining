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







//var fs = require("fs");
//var path = require("path");
//var url = process.argv[2];
//var searchingLinks = require("./link/searchingLinks");
//searchingLinks(url, {
//  maxRecursionLevel: 2
//}).then(function(result) {
//
//  console.log("internal: " + result.internal.length);
//  console.log("e.g. "      + result.internal[0]);
//  console.log("external: " + result.external.length);
//  console.log("e.g. "      + result.external[0]);
//  console.log("errors: "   + result.logs.length);
//
//  fs.writeFile(path.resolve(process.cwd(), "tmp/internalLinks.txt"), result.internal, function (err) {
//    console.log("saving internal links to file - done");
//  });
//  fs.writeFile(path.resolve(process.cwd(), "tmp/externalLinks.txt"), result.external, function (err) {
//    console.log("saving external links to file - done");
//  });
//}).catch(function(err) {
//  console.log(err);
//});










//searcher (folder Lucene - napisane w c#)
var _ = require('lodash');
var robots = require('cyborg.txt');
var searchingLinks = require("./link/searchingLinks");
var cleanHtml = require("./cleanHtml");
var downloadingPage = require('./downloadingPage');
var Searcher = require('../src/searcher');

var rootUrls = [
  'http://www.gazeta.pl/0,0.html',
  'http://www.onet.pl/'
];

var searcher = new Searcher();

var generatingIndex = true;

if(generatingIndex) {
  var bot = new robots.Bot({
    agent: "myWebcrawler",
    maxAge: 999999
  });

  var searchingLinksPromises = _.map(rootUrls, function(url) {
    return searchingLinks(url, {
      maxRecursionLevel: 2
    });
  });

  Promise.all(searchingLinksPromises)
  .then(function(results) {
    var urls = [];
    results.forEach(function(result) {
      urls = urls.concat(result.internal);
      urls = urls.concat(result.external);
    });
    return urls;
  })
  .then(function(urls) {
    var allowPromises = _.map(urls, function(url) {
      var promise = checkingIsAllowed(url);
      promise
      .catch(function(err) {
        console.log("HERE", err);
      });
      return promise;
    });
    return Promise.all(allowPromises);
  })
  .then(function(urls) {
    var addPromises = [];
    urls.forEach(function(url) {
      if(url.isAllow)
        addPromises.push(addingToIndex(url.url));
    });
    return Promise.all(addPromises);
  })
  .then(function() {
    searcher.saveIndex()
    .then(function() {
      console.log("index saved!");
    });
    // searcher.search('osobę', 'word')
    // .then(function(result) {
    //   console.log(result);
    // });
  })
  .catch(function(err) {
    console.log(err);
  });
}
else {
  searcher.loadIndex()
  .then(function() {
    return searcher.search("fabułę", 'word');
  })
  .then(function(result) {
    console.log("HERE");
    console.log(result);
  });
}

function addingToIndex(url) {
  return downloadingPage(url)
  .then(function(content) {
    return searcher.add({
      url: url,
      content: cleanHtml(content)
    });
  })
  .catch(function(err) {
    console.log(err);
  });
}

function checkingIsAllowed(url) {
  return new Promise(function(resolve) {
    bot.allows(url, function() {
      resolve({url: url, isAllow: true});
    });
    bot.disallows(url, function() {
      resolve({url: url, isAllow: false});
    });
  });
}

//robot
// searchingLinks("https://www.google.pl/#q=wiadomo%C5%9Bci", {
//  maxRecursionLevel: 1
// }).then(function(result) {
//
//   console.log("internal: " + result.internal.length);
//   console.log("e.g. "      + result.internal[0]);
//   console.log("external: " + result.external.length);
//   console.log("e.g. "      + result.external[0]);
//   console.log("errors: "   + result.logs.length);
//
//   var urls = result.internal.concat(result.external);
//   console.log(urls);
//
// }).catch(function(err) {
//  console.log(err);
// });
