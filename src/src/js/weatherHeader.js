var grads = [
    [{color:"00000c",position:0},{color:"00000c",position:0}],
    [{color:"020111",position:85},{color:"191621",position:100}],
    [{color:"020111",position:60},{color:"20202c",position:100}],
    [{color:"020111",position:10},{color:"3a3a52",position:100}],
    [{color:"20202c",position:0},{color:"515175",position:100}],
    [{color:"40405c",position:0},{color:"6f71aa",position:80},{color:"8a76ab",position:100}],
    [{color:"4a4969",position:0},{color:"7072ab",position:50},{color:"cd82a0",position:100}],
    [{color:"757abf",position:0},{color:"8583be",position:60},{color:"eab0d1",position:100}],
    [{color:"82addb",position:0},{color:"ebb2b1",position:100}],
    [{color:"94c5f8",position:1},{color:"a6e6ff",position:70},{color:"b1b5ea",position:100}],
    [{color:"b7eaff",position:0},{color:"94dfff",position:100}],
    [{color:"9be2fe",position:0},{color:"67d1fb",position:100}],
    [{color:"90dffe",position:0},{color:"38a3d1",position:100}],
    [{color:"57c1eb",position:0},{color:"246fa8",position:100}],
    [{color:"2d91c2",position:0},{color:"1e528e",position:100}],
    [{color:"2473ab",position:0},{color:"1e528e",position:70},{color:"5b7983",position:100}],
    [{color:"1e528e",position:0},{color:"265889",position:50},{color:"9da671",position:100}],
    [{color:"1e528e",position:0},{color:"728a7c",position:50},{color:"e9ce5d",position:100}],
    [{color:"154277",position:0},{color:"576e71",position:30},{color:"e1c45e",position:70},{color:"b26339",position:100}],
    [{color:"163C52",position:0},{color:"4F4F47",position:30},{color:"C5752D",position:60},{color:"B7490F",position:80},{color:"2F1107",position:100}],
    [{color:"071B26",position:0},{color:"071B26",position:30},{color:"8A3B12",position:80},{color:"240E03",position:100}],
    [{color:"010A10",position:30},{color:"59230B",position:80},{color:"2F1107",position:100}],
    [{color:"090401",position:50},{color:"4B1D06",position:100}],
    [{color:"00000c",position:80},{color:"150800",position:100}],
  ];

function toCSSGradient(data) { 
  var css = "linear-gradient(to bottom, ";
  var len = data.length;
   
  for (var i = 0;i < len; i++)
  { 
     var item = data[i];
     css += " #" + item.color + " " + item.position + "%";
     if ( i < len-1 ) css += ",";
  }
  return css + ")"; 
}

function updateTime() {
  d = moment(); 
  d.local(); 
  return d.hours();  
}

function updateBasedOnNow() { 
  setCSSGradientByIndex(updateTime());
}

function setCSSGradientByIndex(nInx) {  
  if ( nInx != inx ) 
  {
    inx = nInx;
    var data = grads[inx]; 
    if ( data == null ) return;
    
    // convert data to gradient
    var css = toCSSGradient(data);
    
    // update the background
    $("#grad").css("background", css);

    // reset the slider
    $( "#slider" ).slider( "option", "value", (inx/24)*100 );
    
    
    // possible to change the foreground color on background change
    //$("#gradInfo").css("color", "#fff");
  }
  
  // always set time
  d.hours(inx);
  
  // update visible
  $("#time").html(d.format('h:mm'));
  //$("#time").html(d.format('h:mm[<span id="timeOfDay">]a[</span>]'));
  $("#date").html(d.format('MMMM Do YYYY'));
  
  // update in console
//   console.log(d.format('MMMM Do YYYY [\n]h:mm:ss a'));
}

// generate the slider
$( "#slider" ).slider({
    slide: function( event, ui )
    {  
      var per = ui.value == 0 ? 0 : ui.value/100;
      var nInx = Math.round((grads.length-1) * per);
      if ( nInx != inx ) 
      { 
        setCSSGradientByIndex(nInx);
      }
    } 
  }); 

function getLocation()
{
  if (navigator.geolocation) 
  {
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(
                    showLocation,
                    function(){showLocation(defaultLocation);},
                    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
            );
  }
  else 
  { 
     showLocation(defaultLocation);
     alert("Geolocation is not supported by this browser");
  } 
}

function showLocation(position)
{
  console.log(position);
  getSunInfo(position.coords.latitude,position.coords.longitude);
//   getWeather(position.coords.latitude,position.coords.longitude,showWeather);
}

function getSunInfo(lat,lng)
{
  var data = new Date(); 
  var di = SunCalc.getDayInfo(data, lat, lng);
  var sunrisePos = SunCalc.getSunPosition(di.sunrise.start, lat, lng);
  var sunsetPos = SunCalc.getSunPosition(di.sunset.end, lat, lng);
  var sR = moment(di.sunrise.start);
  var sS = moment(di.sunset.end);
  var daylightHours = sS.diff (sR, 'hours');
  console.log("getDayInfo", di);
  console.log("daylightHours", daylightHours); 
}
 
// props
var d = moment(); 
var h = updateTime();
var inx = -1; 
var defaultLocation = {coords:{latitude:40.7144,longitude:-74.006}};

setCSSGradientByIndex(h);
getLocation();

// update every minute
var interval = setInterval(function(){updateBasedOnNow();},60 * 1000);
var interval2 = setInterval(function(){getLocation();},60 * 60 * 1000);
// update onClick
$("#gradInfo").click(function() {
  updateBasedOnNow();
});

