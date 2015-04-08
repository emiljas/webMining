var url = require("url");
var getSecondLevelDomain = require("./getSecondLevelDomain");

function sortLinksByOrigin(links, internalOrigin) {
  var internal = []
     ,external = [];

  var origin = url.parse(internalOrigin);

  links.forEach(function(link) {
    link = link || "";

    var originSecondLevelDomain = getSecondLevelDomain(internalOrigin);
    var linkSecondLevelDomain = getSecondLevelDomain(link);

    if(link && link.indexOf("#") !== 0) {
      if(link.indexOf("/") === 0)
        internal.push(origin.protocol + "//" + origin.hostname + link);
      else if(!hasProtocol(link))
        internal.push(origin.protocol + "//" + origin.hostname + "/" + link);
      else if(originSecondLevelDomain === linkSecondLevelDomain)
        internal.push(link);
      else
        external.push(link);
    }
  });

  return {
    internal: internal,
    external: external
  };
}

function hasProtocol(link) {
  return link.search(new RegExp("^http[s]?://")) === 0;
}

module.exports = sortLinksByOrigin;
