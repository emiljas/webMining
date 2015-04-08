var assert = require("chai").assert;
var getSecondLevelDomain = require("../../src/link/getSecondLevelDomain");

describe("getSecondLevelDomain", function() {
  it("http://www.google.com", function() {
    var domain = getSecondLevelDomain("http://www.google.com");
    assert.equal(domain, "google.com");
  });

  it("www.search.engine.google.com", function() {
    var domain = getSecondLevelDomain("www.search.engine.google.com");
    assert.equal(domain, "google.com");
  });

  it("www.google.com/mail", function() {
    var domain = getSecondLevelDomain("www.google.com/mail");
    assert.equal(domain, "google.com");
  });

  it("#main", function() {
    var domain = getSecondLevelDomain("#main");
    assert.equal(domain, null);
  });

  it("http://google.com", function() {
    var domain = getSecondLevelDomain("http://google.com");
    assert.equal(domain, "google.com");
  });

  it("http://validator.w3.org/check?uri=referer", function() {
    var domain = getSecondLevelDomain("http://validator.w3.org/check?uri=referer");
    assert.equal(domain, "w3.org");
  });
});