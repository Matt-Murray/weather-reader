//loading function
document.onreadystatechange = function() {
    var state = document.readyState;
    if (state == "interactive") {
      document.getElementById("box").style.visibility = "hidden";
    } else if (state == "complete") {
      setTimeout(function() {
        document.getElementById("interactive");
        document.getElementById("loading").style.visibility = "hidden";
        document.getElementById("box").style.visibility = "visible";
      }, 3400);
    }
  };
  
  $(document).ready(function() {
    //get location from IP
    $.getJSON("https://ipapi.co/json/", function(json) {
      $("#location").html(json.city + ", " + json.region_code);
    });
  
    //get weather from API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var weather =
          "https://fcc-weather-api.glitch.me/api/current?lat=" +
          lat +
          "&lon=" +
          lon;
        $.getJSON(weather, function(json) {
          var tempF = json.main.temp * 1.8 + 32;
          var tempC = json.main.temp;
          var weatherType = json.weather[0].main;
          $("#temperature").html(Math.round(tempF));
          $("#condition").html(weatherType);
          //display icon from api
          var icon = json.weather[0].icon;
          $("#icon").attr({
            src: icon
          });
  
          //convert F to C
          $("#tempFar").click(function() {
            $("#tempFar").html("F");
            $("#tempCel").html("C");
            $("#temperature").text(Math.round(tempF));
          });
          $("#tempCel").click(function() {
            $("#tempFar").html("F");
            $("#tempCel").html("C");
            $("#temperature").text(tempC);
          });
        });
      });
    }
  });
  