var splitIntoWords = require("./splitIntoWords");
var groupWords = require("./groupWords");

function buildDocumentVector(text, allWords) {
  var words = splitIntoWords(text);
  var groups = groupWords(words);
  var vector = [];
  allWords.forEach(function(word) {
    if(groups[word]) {
      vector.push(groups[word].n / Object.keys(words).length);
    }
    else {
      vector.push(0);
    }
  });
  return vector;
}

module.exports = buildDocumentVector;
