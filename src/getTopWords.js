function getTopWords(content, k, tresh) {
  var words = content.split(" ");
  var dict = groupWords(words);
  dict = sortByOccurrences(dict);
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
    if(word.word)
      top.push(word);
    k--;
    if (k === 0)
      break;
  }
  return top;
}

module.exports = getTopWords;