var compareDocuments = require("./compareDocuments");
var foreachCombination = require("foreach-combination")

function getArticlePairsBySimilarityRatio(documents, top, order) {
  var results = [];
  foreachCombination(documents, 2, function(document1, document2) {
    var similarityRatio = compareDocuments(document1.text, document2.text);
    results.push({
      similarityRatio: similarityRatio,
      document1: document1,
      document2: document2
    });
  });
  sort(results, order);
  return getTop(results, top);
}


function sort(results, order) {
  if (order === "desc") {
    results.sort(function (result1, result2) {
      return result2.similarityRatio - result1.similarityRatio;
    });
  }
  else if (order === "asc") {
    results.sort(function (result1, result2) {
      return result1.similarityRatio - result2.similarityRatio;
    });
  }
}

function getTop(results, top) {
  var topResults = [];
  for (var i = 0; i < top; i++) {
    var result = results[i];
    topResults.push(result);
  }
  return topResults;
}

module.exports = getArticlePairsBySimilarityRatio;
