//Dom els
var formEl = document.querySelector('#search-form');
var searchInputEl = document.querySelector("#city-input");
var cityHeaderEl = document.querySelector("#city-heading");

//Other global vars
const date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var dateString = "("+month.toString()+"/"+day.toString()+"/"+year.toString()+")";

//display current city weather
var displayCityWeather = function(apiData) {
    cityHeaderEl.innerHTML = apiData.name+ "  " +dateString;
};


//call api, api key [af1fe444e221932e7a28cfd9959741e1]
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var getCityWeather = function(city) {
    //going to call api twice, once for lat and longitude of city, then for weather and forcast
    var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=af1fe444e221932e7a28cfd9959741e1";
    fetch(apiUrl1).then(function(response1) {
        if (response1.ok) {
            response1.json().then(function(data1) {
                var lon = data1.coord.lat;
                var lat = data1.coord.lon;
                //second call, gets weather and forcast including uv index, calling by city does not for some reason
                //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
                var apiUrl2 = "https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&appid=af1fe444e221932e7a28cfd9959741e1";
                fetch(apiUrl2).then(function(response2) {
                    if (response2.ok) {
                        response2.json().then(function(data2) {
                            console.log(data2.current.uvi);
                        });
                    } else {
                        alert("error");
                    }
                });
                //console.log(lat,lon);
                //displayCityWeather(data1);
            });
        } else {
            alert("Error");
        }
    });
    
};

//Search Form Handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get city name
    var cityName = searchInputEl.value.trim();
    if (cityName) {
        //call api with city 
        getCityWeather(cityName);

    }
};


//add event listeners 
formEl.addEventListener("submit",formSubmitHandler);



