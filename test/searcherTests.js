var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');
var Searcher = require('../src/searcher');

var items = [
  {
    content: 'dog cat bird'
  },
  {
    content: 'fish hedgehog'
  },
  {
    content: 'wolf'
  },
  {
    content: 'fox horse cat'
  }
];

var searcher = new Searcher();

describe('Searcher', function() {

  before(function(done) {
    var addPromises = _.map(items, function(item) { return searcher.add(item); });
    Promise.all(addPromises)
    .then(function() { done(); })
    .catch(done);
  });

  it('search by word', function(done) {
    searcher.search('cat', 'word')
    .then(function(results) {
      expect(results.length).to.equal(2);
      done();
    })
    .catch(done);
  });

  it('search by words', function(done) {
    searcher.search('cat wolf', 'words')
    .then(function(results) {
      expect(results.length).to.equal(3);
      done();
    })
    .catch(done);
  });

  it('match exactly', function(done) {
    searcher.search('x ho', 'exactly')
    .then(function(results) {
      expect(results.length).to.equal(1);

      searcher.saveIndex();
      searcher.loadIndex();

      done();
    });
  });

});
