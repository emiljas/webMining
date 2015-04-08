var request = require("request");
var charset = require("charset");
var iconv = require("iconv-lite");

function downloadingPage(url) {
  return new Promise(function(resolve, reject) {
    request.get({
         uri: url,
         encoding: null
       }, function(err, res, body) {
         try {
           var encoding = charset(res.headers, body);
           var content;
           if(encoding != null)
             content = iconv.decode(body, encoding);
           else
             content = body.toString();
           resolve(content);
         }
         catch(err) {
           reject(err);
         }
       }
    );
  });
}

module.exports = downloadingPage;
