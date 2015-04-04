function groupWords(words) {
  var dict = [];
  for (var i = 0; i < words.length; i++) {
    if (dict[words[i]] === undefined) {
      dict[words[i]] = {word: words[i], n: 0};
    }

    dict[words[i]].n++;
  }
  return dict;
}

module.exports = groupWords;
