var express = require("express"),
    server = express(),
    path = require("path");

server.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/public/index.min.html"));
});

server.use(express.static(__dirname + "/public"));

server.listen(8080);

console.log("Listening on port 8080!");
