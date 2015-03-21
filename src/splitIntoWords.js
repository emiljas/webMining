function splitIntoWords(text) {
  var words = text.split(" ");
  removeEmpty(words);
  return words;
}

function removeEmpty(words) {
  words.forEach(function (word, index) {
    if (!word)
      words.splice(index, 1);
  });
}

module.exports = splitIntoWords;
