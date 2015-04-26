var assert = require('chai').assert;
var rimraf = require('rimraf');
var path = require('path');

//var options = { indexPath: 'si2', logLevel: 'error', logSilent: true};
//var si = require('search-index')(options);
//
//var batch = [
//  {
//    'title':'A really interesting document',
//    'body':'This is a really interesting document',
//    'metadata':['red', 'potato']
//  },
//  {
//    'title':'Another interesting document',
//    'body':'This is another really interesting document that is a bit different',
//    'metadata':['yellow', 'potato']
//  }
//];
//
//si.add({'batchName': '', 'filters': []}, batch, function(err) {
//  var query = {
//    "query": {
//      "title": [
//        "really"
//      ]
//    }
//  };
//
//  si.search(query, function(err, results) {
//    if (!err) {
//      results.hits.forEach(function(document) {
//        console.log(document.document.title);
//      });
//    }
//  });
//});

var si = require('search-index')({
  indexPath: 'searchIndex',
  logLevel: 'error',
  logSilent: true
});

function Searcher() {
}

Searcher.prototype.addingBatch = function(books) {
  return new Promise(function(resolve, reject) {
    si.add({'batchName': '', 'filters': []}, books, function(err) {
      if (err)
        reject(err);
      resolve();
    });
  });
};

Searcher.prototype.querying = function(title) {
  return new Promise(function(resolve, reject) {

    si.search({
      'query': {
        'title': ['really sdlfkjsdkl fsdjl fjsldf']
      }
    }, function(err, result) {
      if(err)
        reject(err);
      resolve(result);
    });

  });
};

describe('', function() {

  it('', function(done) {

    var searcher = new Searcher();

    var adding = searcher.addingBatch([
      {
        title: 'really sdlfkjsdkl fsdjl fjsldf',
        body: 'x'
      },
      {
        title: 'interesting sdklfjs dlk fjsdlkf jsdlkf ',
        body: 'y'
      }
    ]);

    adding
       .then(function() {

         var quering = searcher.querying('b');

         quering
            .then(function(books) {
              console.log(books);
              assert.equal(books[0].document.content, 'y');
              done();
            })
            .catch(function(err) {
              done(err);
            });

       })
       .catch(function(err) {
         done(err);
       });


  });


  afterEach(function() {
    var p = path.resolve(process.cwd(), 'searchIndex');
    rimraf(p, function(err) {
      if(err)
        console.log(err);
    });
  });


});