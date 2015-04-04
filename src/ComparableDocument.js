var compareDocuments = require("./compareDocuments");

function ComparableDocument(link, category) {
  this.link = link;
  this.category = category;
}

ComparableDocument.prototype.toString = function() {
  return this.link + " (" + this.category + ")";
};

module.exports = ComparableDocument;