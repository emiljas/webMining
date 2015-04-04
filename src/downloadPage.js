var request = require("request");
var charset = require("charset");
var iconv = require("iconv-lite");

function downloadPage(url, callback) {

  request.get({
       uri: url,
       encoding: null
     }, function (err, res, body) {
       try {
         var encoding = charset(res.headers, body);
         var content;
         if(encoding != null)
           content = iconv.decode(body, encoding);
         else
           content = body.toString();
         callback(content);
       }
       catch(err) {
         //console.log(url);
         throw err;
       }
     }
  );

}

module.exports = downloadPage;