function getTopWords(content, k, tresh) {
  var words = content.split(" ");
  var dict = groupWords(words);
  sortByOccurrences(dict);
  return getTop(dict, k, tresh);
}

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

function sortByOccurrences(dict) {
  dict.sort(function (a, b) {
    if (a.n < b.n)
      return -1;
    else if (a.n > b.n)
      return 1;
    else
      return 0;
  });
}

function getTop(dict, k, tresh) {
  var top = [];
  for (var word in dict) {
    if (dict[word].n < tresh)
      break;
    top.push(dict[word]);
    k--;
    if (k === 0)
      break;
  }
  return top;
}

module.exports = getTopWords;