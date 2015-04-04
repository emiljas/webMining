var url = require("url");

function sortLinksByOrigin(links, internalOrigin) {
  var internal = []
     ,external = [];

  var origin = url.parse(internalOrigin);
  links.forEach(function(link) {
    if(link && link !== "" && link !== "#") {
      if(link.indexOf("/") === 0)
        internal.push(origin.protocol + "//" + origin.hostname + link);
      else if(origin.hostname == url.parse(link).hostname)
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

module.exports = sortLinksByOrigin;
