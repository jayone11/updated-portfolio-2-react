const secret = "69f9a3f50c1b57a4beb25fb3ddf90199";
// var url = api.openweathermap.org/data/2.5/weather?q={city name}

$(document).ready(function() {
    
    var newDate = function(days){
        var todaysDate = new Date();
        var addDays = days;
        todaysDate.setDate(todaysDate.getDate() + addDays); 
      
        var dd = todaysDate.getDate();
        var mm = todaysDate.getMonth() + 1;
        var y = todaysDate.getFullYear();
      
        return mm + '/'+ dd + '/'+ y;
      }

    var previousCities = [];
    // Check for previously searched cities from localStorage
    if(localStorage.getItem('prevCities')){
        // Add previously searched cities to the array
        previousCities = JSON.parse(localStorage.getItem('prevCities'));
        // Loop through each city in localStorage
        previousCities.forEach(item => {
            $('.cities-list').prepend(`<li class="city-list"><span class="city-name">${item}</span></li>`);
            // debugger;
        });
    }
    // Create a function that accepts a seachInput and check 
    var weatherActivate = function(searchInput, prevSearched){
        // Check for user input, if none, show error message
        if(!searchInput) {
            var a = $('<p class="error-msg" style="margin-top:10px;color:red;">').text('Enter a city, state or zip code');
            $('.search-section').append(a);
            return;
        } else { 
            $('.error-msg').remove();
            // Ajax call to OpenWeather API - Single City Parameter - Call #1
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial" + "&appid=" + secret,
                method: "GET",
                error: function(XMLHttpRequest, errorStatus, errorThrown){
                    var a = $('<p class="error-msg" style="margin-top:10px;color:red;">').text('No city found. Check spelling.');
                    $('.search-section').append(a);
                },
                success: function(response){
                    // console.log(response);
                    if(prevSearched === true){
                        if(previousCities.includes($('.search-input').val()) !== true){
                            previousCities.push($('.search-input').val());
                            localStorage.setItem('prevCities', JSON.stringify(previousCities));
                            var item = $('.search-input').val();
                            $('.cities-list').prepend(`<li class="city-list"><span class="city-name">${item}</span></li>`);
                        }
                        localStorage.setItem('prevSearch', $('.search-input').val());
                        // var item = $('.search-input').val();
                        // $('.cities-list').prepend(`<li class="city-list"><span class="city-name">${item}</span></li>`);
                    }
                    // Get city ID from response
                    var cityId = response.id;
                    // Ajax call to OpenWeather API using city ID - Call #2
                    $.ajax({
                        url: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&units=imperial" + "&appid=" + secret, 
                        method: "GET",
                        success: function(response){
                            // console.log(response);
                            $('.city-name-summary').text("");
                            $('.city-name-summary').text(response.city.name);
                            $('.weather-icon-summary').html(`<img src="https://openweathermap.org/img/w/${response.list[0].weather[0].icon}.png" alt="${response.list[0].weather[0].description}">`);
                            $('.temp-summary').text(Math.round(response.list[0].main.temp) + "\u00B0" + " F");
                            $('.humidity-summary').text(response.list[0].main.humidity + "%");
                            $('.wind-speed-summary').text(Math.round(response.list[0].wind.speed) + " MPH");
            
                            // Ajax call to get UV index data - Call #3
                            $.ajax({
                                url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + secret + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon,
                                method: "GET",
                                success: function(response){
                                    // console.log(response);
                                    $('.uv-index-summary').text(response.value);
                                }});
                                $('.forecast-cards').html("");

                                // Add 5 day forecast
                                for(var i = 1; i <= 5; i++){
                                    var forecast = function(i){
                                      return(`<div class="forecast-card">` +
                                      `<p class="forecast-item">` + newDate(i) + `</p>` +  
                                      `<img class="forecast-item weather-icon" src="https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" alt="${response.list[i].weather[0].description}">` +
                                      `<p class="forecast-item temp">Temp: ${Math.round(response.list[i].main.temp) + "\u00B0" + " F"}</p>` +
                                      `<p class="forecast-item humidity">Humidity: ${response.list[i].main.humidity + "%"}</p>` +
                                      `</div>`);
                                    }
                                    $(".forecast-cards").append(forecast(i));
                                  }}
                        });
                    }
                })
            }  
    };
    
    if(localStorage.getItem('prevSearch')){
        weatherActivate(localStorage.getItem('prevSearch'), false);
    } else {
        // Default City
        weatherActivate('Los Angeles', false);
    }
    // listen for click on city name
    $(".city-name").on('click', function() {
        weatherActivate($(this).html().toString(), false);
        // console.log(this);
      });
    // Get user search query if clicking search button    
    $('.search-button').on('click', function() {
        weatherActivate($('.search-input').val(), true);
    });
    // Get user search query if pressing enter
    $('.search-input').on('keyup', function() {
        if(event.keyCode === 13)
        weatherActivate($('.search-input').val(), true);
    });   
    
});