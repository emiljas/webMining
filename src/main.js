var saveDirtyAndCleanPage = require("./saveDirtyAndCleanPage");

var url = process.argv[2];
saveDirtyAndCleanPage(url, function() {
  console.log("save dirty and clean page - done");
});

