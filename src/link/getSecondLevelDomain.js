var parseUrl = require("url").parse;

function getSecondLevelDomain(url) {
  if(url.indexOf("www.") === 0)
    url = "http://" + url;
  var hostname = parseUrl(url).hostname;

  if(hostname === null)
    return null;
  return new RegExp("[a-zA-Z0-9]+[.][a-zA-Z]+$").exec(hostname)[0];
}

module.exports = getSecondLevelDomain;