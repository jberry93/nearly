var express = require("express"),
    server = express(),
    path = require("path");

server.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/views/index.html"));
});

server.use("/bower_components", express.static(__dirname + "/../nearly/bower_components"));
server.use("/app", express.static(__dirname + "/../nearly/app"));
server.use(express.static(__dirname + "/views"));
server.use("/js", express.static(__dirname + "/js"));

server.listen(8080);

console.log("Listening on port 8080!");
