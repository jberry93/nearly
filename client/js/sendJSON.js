// make JSON object
function makeObject() {
  var term = document.getElementById("x").value;
  var location = document.getElementById("y").value;
  var object = {
    term: term,
    location: location
  };
  return JSON.stringify(object);
}

// send JSON object
function sendObject(event) {
  event.preventDefault();
  console.log(makeObject());
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", "/", true);
  httpRequest.setRequestHeader("Content-type", "application/json");
  httpRequest.send(makeObject());
  httpRequest.addEventListener("load", function() {
    console.log(httpRequest.responseText);
  });
}

var goButton = document.getElementById("go");

goButton.addEventListener("click", sendObject, false);
