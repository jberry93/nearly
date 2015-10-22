function createMap() {
  // add a search box
  var worldBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90, -180),
    new google.maps.LatLng(90, 180)
  );
  var yInput = document.getElementById("y");
  var theSearchBox = new google.maps.places.SearchBox(yInput, {bounds: worldBounds});

  // make map
  var mapContainer = document.getElementById("map");
  var mapCenter = {lat: 33.6937232, lng: -117.8055461};
  var mapOptions = {
    center: mapCenter,
    zoom: 14,
    scrollwheel: false
  };
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
        markerArray.push(yMarker);
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

      // callback function 'postResults' for Places service
      function postResults(listOfResults, statusCode) {
        if(statusCode === google.maps.places.PlacesServiceStatus.OK) {
          for(var result = 0; result < listOfResults.length; result++) {
            makeMarker(listOfResults[result]);

            // radian conversion function
            function radians(degrees) {
              var convert = (degrees * Math.PI) / 180;
              return convert;
            }

            // add haversine algorithm to calculate distances
            function haversine() {
              var latDifference = radians(listOfResults[result].geometry.location.lat() - results[0].geometry.location.lat());
              var lngDifference = radians(listOfResults[result].geometry.location.lng() - results[0].geometry.location.lng());
              var radius = 3961;
              var a = Math.pow(Math.sin(latDifference / 2), 2) +
                      Math.cos(radians(results[0].geometry.location.lat())) *
                      Math.cos(radians(listOfResults[result].geometry.location.lat())) *
                      Math.pow(Math.sin(lngDifference / 2), 2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = radius * c;
              return d;
            }

            // add name and distances to list
            var distanceList = document.getElementById("distance");
            var distanceItem = document.createElement("li");
            var distanceText = document.createTextNode(listOfResults[result].name + " is " + haversine().toFixed(2) + " miles away");
            distanceItem.appendChild(distanceText);
            distanceList.appendChild(distanceItem);
          }
        }
      }
    });
  }

  // add info windows to markers
  var infoWindow = new google.maps.InfoWindow();
  var markerArray = [];
  function makeMarker(place) {
    var locationLocation = place.geometry.location;
    var markerOptions = {
      map: map,
      position: locationLocation,
      animation: google.maps.Animation.DROP
    };
    var marker = new google.maps.Marker(markerOptions);
    markerArray.push(marker);
    google.maps.event.addListener(marker, "mouseover", function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }
}
