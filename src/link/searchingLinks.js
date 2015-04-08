var url = require("url");
var downloadingPage = require("../../src/downloadingPage");
var getAllLinks = require("../../src/link/getAllLinks");
var sortLinksByOrigin = require("../../src/link/sortLinksByOrigin");

function searchingLinks(rootUrl, options) {
  return PageProcessor.processingPage({
    rootUrl           : rootUrl,
    maxRecursionLevel : options ? options.maxRecursionLevel : undefined
  });
}

function VisitedLinks() {
  this.dict = {};

  this.add = function(link) {
    link = this.normalizeUrl(link);
    this.dict[link] = true;
  };

  this.isVisited = function(link) {
    link = this.normalizeUrl(link);
    return this.dict[link];
  };

  this.normalizeUrl = function(link) {
    var parsedUrl = url.parse(link);
    return parsedUrl.host + parsedUrl.pathname;
  };
}

function SearchingLinksResult() {
  this.internal = [];
  this.external = [];
  this.logs     = [];
}

function PageProcessor(args) {
  var self = this;

  this.rootUrl               = args.rootUrl;
  this.url                   = args.url || args.rootUrl;
  this.result                = args.result || new SearchingLinksResult();
  this.visitedLinks          = args.visitedLinks || new VisitedLinks();
  this.maxRecursionLevel     = args.maxRecursionLevel     || Number.MAX_VALUE;
  this.currentRecursionLevel = args.currentRecursionLevel || 1;

  this.processing = function() {
    var promise = new Promise(function(resolve, reject) {
      self.resolve = resolve;
      self.reject = reject;
      if(self.currentRecursionLevel > self.maxRecursionLevel)
        self.resolve(self.result);
      else if(self.visitedLinks.isVisited(self.url))
        self.resolve(self.result);
      else {
        self.visitedLinks.add(self.url);
        downloadingPage(self.url)
           .then(function(content) {
             self.content = content;
             self.searchPage();
           })
           .catch(function(err) {
             self.logError(err);
           });
      }
    });
    return promise;
  };

  this.logError = function(err) {
    this.result.logs.push({
      url: this.url,
      error: err.toString(),
      stack: err.stack
    });
    this.resolve(this.result);
  };

  this.searchPage = function() {
    var allLinks = getAllLinks(this.content);
    this.links = sortLinksByOrigin(allLinks, this.rootUrl);
    this.promises = [];

    this.processInternalLinks();
    this.processExternalLinks();
    this.resolveAll();
  };

  this.processInternalLinks = function() {
    self.links.internal.forEach(function(link) {
      self.processInternalLink(link);
    });
  };

  this.processInternalLink = function(link) {
    this.result.internal.push(link);
    var processing = PageProcessor.processingPage({
      rootUrl               : this.rootUrl,
      url                   : link,
      result                : this.result,
      visitedLinks          : this.visitedLinks,
      maxRecursionLevel     : this.maxRecursionLevel,
      currentRecursionLevel : this.currentRecursionLevel + 1
    });
    this.promises.push(processing);
  };

  this.processExternalLinks = function() {
    self.links.external.forEach(function(link) {
      self.result.external.push(link);
    });
  };

  this.resolveAll = function() {
    Promise.all(self.promises)
       .then(function() {
         self.resolve(self.result);
       });
  }
}

PageProcessor.processingPage = function(args) {
  var processor = new PageProcessor(args);
  return processor.processing();
};

module.exports = searchingLinks;