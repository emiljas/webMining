var splitIntoWords = require("./splitIntoWords");
var groupWords = require("./groupWords");

function getTopWords(content, k, tresh) {
  var words = splitIntoWords(content);
  var dict = groupWords(words);
  dict = sortByOccurrences(dict);
  return getTop(dict, k, tresh);
}

function sortByOccurrences(dict) {
  var temp = [];
  for(var word in dict) {
    temp.push(dict[word]);
  }

  temp.sort(function (a, b) {
    return b.n - a.n;
  });

  return temp;
}

function getTop(dict, k, tresh) {
  var top = [];
  for (var i = 0; i < dict.length; i++) {
    var word = dict[i];
    if (word.n < tresh)
      break;
    top.push(word);
    k--;
    if (k === 0)
      break;
  }
  return top;
}

module.exports = getTopWords;