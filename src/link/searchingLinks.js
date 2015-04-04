var downloadPage = require("../../src/downloadPage");
var getAllLinks = require("../../src/link/getAllLinks");
var sortLinksByOrigin = require("../../src/link/sortLinksByOrigin");

function searchingLinks(rootUrl, url, maxRecursiveLevel, links, recursiveLevel, isInternal) {
  //if(typeof recursiveLevel === "undefined")
  //  recursiveLevel = 0;
  //if(typeof links === "undefined") {
  //  links = {
  //    internal: {},
  //    external: {}
  //  };
  //}
  //
  //if(recursiveLevel > maxRecursiveLevel)
  //  return Promise.resolve(dictsToArray(links));
  //
  //var p = new Promise(function(resolve, reject) {
  //  var nonSeenYet = !(url in links.internal || url in links.external);
  //  if(nonSeenYet) {
  //
  //    if(recursiveLevel > 0) {
  //      if(isInternal)
  //        links.internal[url] = url;
  //      /*else
  //        links.external[url] = url;*/
  //    }
  //
  //    downloadPage(url, function(content) {
  //      var promises = [];
  //      var pageLinks = sortLinksByOrigin(getAllLinks(content), rootUrl);
  //      pageLinks.internal.forEach(function(link) {
  //        processLink(link, true);
  //      });
  //      pageLinks.external.forEach(function(link) {
  //        //processLink(link, false);
  //        links.external[link] = link;
  //      });
  //
  //      Promise.all(promises)
  //         .then(function() {
  //           resolve(dictsToArray(links));
  //         })
  //         .catch(function() {
  //           reject();
  //         });
  //
  //      function processLink(link, isInternal) {
  //        var nonSeenYet = !(link in pageLinks.internal || link in pageLinks.external);
  //        if(nonSeenYet/* && link.indexOf("#") === -1*/) {
  //          var p = searchingLinks(rootUrl, link, maxRecursiveLevel, links, recursiveLevel + 1, isInternal);
  //          promises.push(p);
  //        }
  //      }
  //    });
  //  }
  //  else {
  //    resolve();
  //  }
  //});
  //return p;
}

function dictsToArray(links) {
  var ret = {
    internal: [],
    external: []
  };

  for(var link in links.internal)
    ret.internal.push(link);
  for(var link in links.external)
    ret.external.push(link);
  return ret;
}

module.exports = searchingLinks;
