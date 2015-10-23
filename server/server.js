var express = require("express"),
    server = express(),
    mongoose = require("mongoose"),
    parser = require("body-parser"),
    parseJSON = parser.json(),
    path = require("path");

mongoose.connect("mongodb://localhost/nearly");

server.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/public/index.min.html"));
});

server.get("/history", function(request, response) {
  mongoose.model("history").find(function(error, history) {
    response.send(history);
  });
});

var historySchema = mongoose.Schema({
  term: String,
  location: String
});

var YourHistory = mongoose.model("history", historySchema);

server.post("/", parseJSON, function(request, response) {
  console.log(request.body);
  var history = new YourHistory(request.body);
  history.save();
  response.send("Got it!");
});

server.use(express.static(__dirname + "/public"));

server.listen(8080);

console.log("Listening on port 8080!");
