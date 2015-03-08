var assert = require("chai").assert;
var cleanHtml = require("../src/cleanHtml.js");

describe("cleanHtml", function() {

  it("remove all html tags", function() {
    checkHtml(
       "<html>abc</html>",
       "abc");
  });

  it("remove multiple lines", function() {
    checkHtml(
       "a\nb\n\nc\n\n\nd",
       "a\nb\n\nc\n\nd");
  });

  it("treat whitespace line as empty line", function() {
    checkHtml(
       "a\n   \n \t \n\t\t  \nb",
       "a\n\nb"
    );
  });

  it("trim lines", function() {
    checkHtml(
       "    \t\t   a\n" +
       "           b\n" +
       "\t   \t\t\tc",
       "a\nb\nc"
    );
  });

  it("decode html entities", function() {
    checkHtml("&apos;something&apos;", "'something'")
  });

  it("removeStartingEmptyLines", function() {
    checkHtml("\n\na", "a");
  });

  it("removeEndingEmptyLines", function() {
    checkHtml("a\n\n", "a");
  });

  function checkHtml(input, expected) {
    var result = cleanHtml(input);
    assert.equal(result, expected);
  }
});
