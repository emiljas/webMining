var assert = require("chai").assert;

var splitIntoWords = require("../src/splitIntoWords");
var groupWords = require("../src/groupWords");
var buildDocumentVector = require("../src/buildDocumentVector");

function compareDocuments(text1, text2) {
  var allWords = join(groupWords(splitIntoWords(text1)), groupWords(splitIntoWords(text2)));
  var v1 = buildDocumentVector(text1, allWords);
  var v2 = buildDocumentVector(text2, allWords);

  var scalarProduct = calculateScalarProduct(v1, v2);
  var v1Length= calculateVectorLength(v1);
  var v2Length = calculateVectorLength(v2);
  return calculateSimilarityRatio(scalarProduct, v1Length, v2Length);
}

function calculateScalarProduct(vector1, vector2) {
  var product = 0;
  for(var i = 0; i < vector1.length; i++)
    product += vector1[i] * vector2[i];
  return product;
}

function calculateVectorLength(vector) {
  var vectorLength = 0;
  for(var i = 0; i < vector.length; i++)
    vectorLength += Math.pow(vector[i], 2);
  vectorLength = Math.sqrt(vectorLength);
  return vectorLength;
}

function calculateSimilarityRatio(scalarProduct, vectorLength1, vectorLength2) {
  if (vectorLength1 === 0 && vectorLength2 === 0)
    return 1;
  else if (vectorLength1 === 0 || vectorLength2 === 0)
    return 0;
  else
    return scalarProduct / (vectorLength1 * vectorLength2);
}

function join(words1, words2) {
  var s = [];
  var allWords = [];
  for (var word in words1)
    if (!allWords[word])
      allWords[word] = word;

  for (var word in words2)
    if (!allWords[word])
      allWords[word] = word;

  for (var word in allWords) {
    s.push(word);
  }

  return s;
}

describe("compareDocuments", function() {

  it("same sentence", function() {
    var similarityRatio = compareDocuments("ala ma kota", "kota ala ma");
    assert.equal(similarityRatio, 1);
  });

  it("one empty sentance", function() {
    var similarityRatio = compareDocuments("", "ala ma kota");
    assert.equal(similarityRatio, 0);
  });

  it("empty sentences", function() {
    var similarityRatio = compareDocuments("", "");
    assert.equal(similarityRatio, 1);
  });

});