var cheerio = require("cheerio");

function getAllLinks(html) {
  var anchors = [];
  if(html) {
    var $ = cheerio.load(html);
    var anchorNodes = $("a");
    for(var i = 0; i < anchorNodes.length; i++)
      anchors.push(cheerio(anchorNodes[i]).attr("href"));
  }
  return anchors;
}

module.exports = getAllLinks;
