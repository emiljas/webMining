var sanitizeHtml = require('sanitize-html');
var Entities = require("html-entities").XmlEntities;

function cleanHtml(html) {
  html = removeHtmlTags(html);
  html = treatWhitespaceLineAsEmpty(html);
  html = removeMultipleLines(html);
  html = trimLines(html);
  html = decodeHtmlEntites(html);
  html = removeStartingEmptyLines(html);
  html = removeEndingEmptyLines(html);

  return html;

    function removeHtmlTags(html) {
      html = sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: []
      });
      return html;
    }

    function treatWhitespaceLineAsEmpty(html) {
      return html.replace(/\n\s*\n/g, "\n\n");
    }

    function removeMultipleLines(html) {
      return html.replace(/[\n]{3,}/g, "\n\n");
    }

    function trimLines(html) {
      var lines = html.split("\n");
      for (var i = 0; i < lines.length; i++)
        lines[i] = lines[i].trim();
      return lines.join("\n");
    }

    function decodeHtmlEntites(html) {
      var entities = new Entities();
      return entities.decode(html);
    }

    function removeStartingEmptyLines(html) {
      return html.replace(/^\n*/g, "");
    }

    function removeEndingEmptyLines(html) {
      return html.replace(/\n*$/g, "");
    }
}

module.exports = cleanHtml;