function createMap() {
  // make map
  var mapContainer = document.getElementById("map");
  var mapCenter = {lat: 33.6937232, lng: -117.8055461};
  var mapOptions = {center: mapCenter, zoom: 13};
  var map = new google.maps.Map(mapContainer, mapOptions);

  // add Geocoder service
  var geoCoder = new google.maps.Geocoder();
  function codeAddress() {
    // var address = document.getElementById("address").value;
    var y = document.getElementById("y").value;
    geoCoder.geocode({"address": y}, function(results, statusCode) {
      if(statusCode === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var addressMarker = new google.maps.Marker({map: map, position: results[0].geometry.location});
      } else {
        alert("Oops it broke");
      }

      // add Places service
      var x = document.getElementById("x").value;
      var placesService = new google.maps.places.PlacesService(map);
      placesService.nearbySearch({
        location: results[0].geometry.location,
        radius: 2000,
        keyword: x
      }, callback);
      function callback(listOfResults, statusCode) {
        if(statusCode === google.maps.places.PlacesServiceStatus.OK) {
          for(var result = 0; result < listOfResults.length; result++) {
            makeMarker(listOfResults[result]);
            console.log(listOfResults[result]);
          }
        }
      }
    });
  }

  // add reference to button
  var goButton = document.getElementById("go");
  goButton.addEventListener("click", codeAddress, false);

  // add info windows to markers
  var infoWindow = new google.maps.InfoWindow();
  function makeMarker(place) {
    var locationLocation = place.geometry.location;
    var markerOptions = {map: map, position: locationLocation};
    var marker = new google.maps.Marker(markerOptions);
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  // record users' location
  var yourLat, yourLng;
  function showLocation(position) {
    yourLat = position.coords.latitude;
    yourLng = position.coords.longitude;
    var myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
  }

  // get user's location
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);
  } else {
    alert("You need to enable geolocation!");
    location.reload(true);
  }
}
