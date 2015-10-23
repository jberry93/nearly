var express = require("express"),
    server = express(),
    mongoose = require("mongoose"),
    mongoClient = require("mongodb").MongoClient, // look up
    assert = require("assert"), // look up
    objectID = require("mongodb").ObjectID, // look up
    url = "mongodb://localhost:27017/nearly",
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

// Make function to look for objects w/in 'histories' collection
function findObjects(database, callback) {
  var find = database.collection("histories").find();
  find.each(function(error, doc) {
    assert.equal(error, null);
    if(doc !== null) {
      console.log(doc);
    } else {
      callback();
    }
  });
}

// Connect to mongodb and call the above function
mongoClient.connect(url, function(error, database) {
  assert.equal(null, error);
  findObjects(database, function() {
    database.close();
  });
});

server.use(express.static(__dirname + "/public"));

server.listen(8080);

console.log("Listening on port 8080!");
