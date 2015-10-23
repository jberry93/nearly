var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nearly");

var database = mongoose.connection;
database.on("error", console.error.bind(console, "connection error!"));
database.once("open", function() {
  console.log("Connected!!");
});

var historySchema = mongoose.Schema({
  term: String,
  location: String
});

var List = mongoose.model("List", historySchema);

var history1 = new List({
  term: "food",
  location: "Torrance, CA"
});

history1.save();

List.find(function(error, lists) {
  if(error) {
    return console.log(error);
  } else {
    console.log(lists);
  }
});
