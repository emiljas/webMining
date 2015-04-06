var downloadPage = require("../../src/downloadPage");
var getAllLinks = require("../../src/link/getAllLinks");
var sortLinksByOrigin = require("../../src/link/sortLinksByOrigin");

function searchingLinks(rootUrl) {
  var args = {
    rootUrl: rootUrl,
    result: {
      internal: [],
      external: []
    }
  };
  return recursive(args);
}

function recursive(args) {
  var promise = new Promise(function(resolve, reject) {

    downloadPage(args.rootUrl, function(content) {

      args.resolve = resolve;
      args.reject = reject;
      args.content = content;
      searchPage(args);

    });

  });
  return promise;
}

function searchPage(args, content) {
  var allLinks = getAllLinks(args.content);
  args.links = sortLinksByOrigin(allLinks, args.rootUrl);
  args.promises = [];

  processInternalLinks(args);
  resolveAll(args);
}

function processInternalLinks(args) {
  args.links.internal.forEach(function(link) {
    processInternalLink(args, link);
  });
}

function processInternalLink(args, link) {
  args.result.internal.push(link);
  args.promises.push(recursive({
    rootUrl: link,
    result: args.result
  }));
}

function resolveAll(args) {
  Promise.all(args.promises)
     .then(function() {
       args.resolve(args.result);
     })
     .catch(function(err) {
       args.reject(err);
     });
}

function PageProcessor {

}

module.exports = searchingLinks;