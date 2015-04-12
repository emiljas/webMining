var assert = require('chai').assert;
var rimraf = require('rimraf');
var path = require('path');

var options = { indexPath: 'searchIndex', logLevel: 'info', logSilent: false }
var si = require('search-index')(options);

function Searcher() {
}


Searcher.prototype.addingBatch = function(books) {
  return new Promise(function(resolve, reject) {
    si.add({'batchName': 'sdf', 'filters': ['title']}, books, function(err) {
      if (err)
        reject(err);
      resolve();
    });
  });
};

Searcher.prototype.querying = function(title) {
  return new Promise(function(resolve, reject) {
    var query = {
      'query': {
        '*': ['b']
      },
      'facets': {'title': {}}
    };
    si.search(query, function(err, result) {
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
        title: 'a',
        content: 'x'
      },
      {
        title: 'b',
        content: 'y'
      }
    ]);

    adding
       .then(function() {

         si.tellMeAboutMySearchIndex(function(msg) {
           console.log(msg);
         });

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