function splitIntoWords(text) {
  var words = text.split(" ");
  removeEmpty(words)
  return words;
}

function removeEmpty(words) {
  for(var i = words.length - 1; i >= 0; i--)
    if(!words[i])
      words.splice(i, 1);
}

module.exports = splitIntoWords;
