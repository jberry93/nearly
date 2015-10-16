function createMap() {
  //Use Geolocation to get lat/lng:
  var yourLat, yourLng;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      yourLat = position.coords.latitude;
      yourLng = position.coords.longitude;
      console.log(yourLat);
      console.log(yourLng);
    });
  } else {
    alert("You need to enable geolocation!");
    location.reload(true);
  }
}
createMap();
