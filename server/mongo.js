var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nearly");

var database = mongoose.connection;
database.on("error", console.log("connection error!"));
database.once("open", function() {
  console.log("Connected!!");
});

var historySchema = mongoose.Schema({
  term: String,
  location: String,
  distance: Number,
  list: String
});

var List = mongoose.model("List", historySchema);
