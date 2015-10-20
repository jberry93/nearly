function createMap() {
  // make map
  var mapContainer = document.getElementById("map");
  var mapCenter = {lat: 33.6937232, lng: -117.8055461};
  var mapOptions = {center: mapCenter, zoom: 14};
  var map = new google.maps.Map(mapContainer, mapOptions);

  // add reference to button
  var goButton = document.getElementById("go");
  goButton.addEventListener("click", function() {
    removeMarkers(); // remove old markers first
    codeAddress(); // populate map with new markers
  }, false);

  // remove old markers
  function removeMarkers() {
    markerArray.forEach(function(marker) {
      marker.setMap(null);
    });
    markerArray = [];
  }

  // add Geocoder service
  var geoCoder = new google.maps.Geocoder();
  function codeAddress() {
    var yValue = document.getElementById("y").value;
    geoCoder.geocode({address: yValue}, function(results, statusCode) {
      if(statusCode === google.maps.GeocoderStatus.OK) {
        var yMarkerOptions = {
          map: map,
          position: results[0].geometry.location,
          animation: google.maps.Animation.DROP,
          label: yValue
        }
        var yMarker = new google.maps.Marker(yMarkerOptions);
        map.setCenter(results[0].geometry.location);
      } else {
        alert("Oops it broke");
      }

      // add Places service
      var x = document.getElementById("x").value;
      var placesService = new google.maps.places.PlacesService(map);
      placesService.nearbySearch({
        location: results[0].geometry.location,
        keyword: x,
        rankBy: google.maps.places.RankBy.DISTANCE
      }, postResults);
      function postResults(listOfResults, statusCode) {
        if(statusCode === google.maps.places.PlacesServiceStatus.OK) {
          for(var result = 0; result < listOfResults.length; result++) {
            makeMarker(listOfResults[result]);
          }
        }
      }
    });
  }

  // add info windows to markers
  var infoWindow = new google.maps.InfoWindow();
  var markerArray = [];
  function makeMarker(place) {
    console.log(place);
    var locationLocation = place.geometry.location;
    var markerOptions = {
      map: map,
      position: locationLocation,
      animation: google.maps.Animation.DROP
    };
    var marker = new google.maps.Marker(markerOptions);
    markerArray.push(marker);
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  // get user's location
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);
  } else {
    alert("You need to enable geolocation!");
    location.reload(true);
  }

  // record users' location
  var yourLat, yourLng;
  function showLocation(position) {
    yourLat = position.coords.latitude;
    yourLng = position.coords.longitude;
    var myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
  }

  // add a search box
  var worldBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90, -180),
    new google.maps.LatLng(90, 180)
  );
  var yInput = document.getElementById("y");
  var theSearchBox = new google.maps.places.SearchBox(yInput, {bounds: worldBounds});
}
