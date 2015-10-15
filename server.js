var express = require("express"),
    app = express(),
    path = require("path");

app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/views/index.html"));
});

app.listen(8080);

console.log("Listening on port 8080!");
