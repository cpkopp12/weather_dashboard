//Dom els
var formEl = document.querySelector('#search-form');
var searchInputEl = document.querySelector("#city-input");
var cityHeaderEl = document.querySelector("#city-heading");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUviEl = document.querySelector("#current-uvi");
var searchHistoryUlEl = document.querySelector("#search-history-ul");

//method for generating date string
var getDateString = function(dateObj) {
    var day2 = dateObj.getDate();
    var month2 = dateObj.getMonth()+1;
    var year2 = dateObj.getFullYear();
    var dateString = month2.toString()+"/"+day2.toString()+"/"+year2.toString();
    return dateString;
};

//Other global vars
const date = new Date();
var datep1 = new Date(date);
datep1.setDate(datep1.getDate()+1);
var datep2 = new Date(date);
datep2.setDate(datep2.getDate()+2);
var datep3 = new Date(date);
datep3.setDate(datep3.getDate()+3);
var datep4 = new Date(date);
datep4.setDate(datep4.getDate()+4);
var datep5 = new Date(date);
datep5.setDate(datep5.getDate()+5);
var datep1String = getDateString(datep1);
var datep2String = getDateString(datep2);
var datep3String = getDateString(datep3);
var datep4String = getDateString(datep4);
var datep5String = getDateString(datep5);
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var dateStringCurrent = "("+month.toString()+"/"+day.toString()+"/"+year.toString()+")";
var cityheadername = "";
var searchHistory =[];

//method to return url string to icon given id
var getIconString = function(iconId) {
    return "<img src=https://openweathermap.org/img/wn/"+iconId+".png>";
};


//save Search History, call in getCityWeather()
var saveSearchHistory = function() {
    localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
};

//load Search history
var loadSearchHistory = function() {
    var localHist = localStorage.getItem("searchHistory");
    localHist = JSON.parse(localHist);
    if (localHist == null) {
        return false;
    } else {
        for (let i = 0; i < localHist.length; i++) {
            appendSearchHistory(localHist[i]); 
        }
    }
};


//append search to search history ul
var appendSearchHistory = function(citySearched) {
    for (let i =0; i < searchHistory.length; i++) {
        if (citySearched == searchHistory[i]) {
            return;
        }
    }
    //add city search to to search history array
    searchHistory.push(citySearched);

    //create new display new list el
    var newSearchHistoryEl = document.createElement("button");
    newSearchHistoryEl.setAttribute("class","list-group-item btn btn-primary btn-block mt-2");
    newSearchHistoryEl.setAttribute("type","button");
    newSearchHistoryEl.setAttribute("style","background-color:blue;");
    newSearchHistoryEl.innerHTML = citySearched;
    
    searchHistoryUlEl.appendChild(newSearchHistoryEl);
};

//search history handler function
var searchHistoryHandler = function(event) {
    event.preventDefault();
    var btnClicked = event.target;
    var cityClicked = btnClicked.innerHTML;
    getCityWeather(cityClicked);
};

//display five day forcast, lots of repeating code (definitely not the best way of doing this) so I made its own function
//called in displayCityWeather() function
var displayForcast = function(apiData) {
    //tomorrow
    document.querySelector("#p1-date").innerHTML = datep1String;
    document.querySelector("#p1-icon").innerHTML = getIconString(apiData.daily[1].weather[0].icon);
    document.querySelector("#p1-temp").innerHTML = "Temp: " + apiData.daily[1].temp.day + "\u2109";
    document.querySelector("#p1-wind").innerHTML = "Wind: " + apiData.daily[1].wind_speed + "mph";
    document.querySelector("#p1-humidity").innerHTML = "Humidity: " + apiData.daily[1].humidity+ "%";

    //p2
    document.querySelector("#p2-date").innerHTML = datep2String;
    document.querySelector("#p2-icon").innerHTML = getIconString(apiData.daily[2].weather[0].icon);
    document.querySelector("#p2-temp").innerHTML = "Temp: " + apiData.daily[2].temp.day + "\u2109";
    document.querySelector("#p2-wind").innerHTML = "Wind: " + apiData.daily[2].wind_speed + "mph";
    document.querySelector("#p2-humidity").innerHTML = "Humidity: " + apiData.daily[2].humidity+ "%";

    //p3
    document.querySelector("#p3-date").innerHTML = datep3String;
    document.querySelector("#p3-icon").innerHTML = getIconString(apiData.daily[3].weather[0].icon);
    document.querySelector("#p3-temp").innerHTML = "Temp: " + apiData.daily[3].temp.day + "\u2109";
    document.querySelector("#p3-wind").innerHTML = "Wind: " + apiData.daily[3].wind_speed + "mph";
    document.querySelector("#p3-humidity").innerHTML = "Humidity: " + apiData.daily[3].humidity+ "%";

    //p4
    document.querySelector("#p4-date").innerHTML = datep4String;
    document.querySelector("#p4-icon").innerHTML = getIconString(apiData.daily[4].weather[0].icon);
    document.querySelector("#p4-temp").innerHTML = "Temp: " + apiData.daily[4].temp.day + "\u2109";
    document.querySelector("#p4-wind").innerHTML = "Wind: " + apiData.daily[4].wind_speed + "mph";
    document.querySelector("#p4-humidity").innerHTML = "Humidity: " + apiData.daily[4].humidity+ "%";

    //p5
    document.querySelector("#p5-date").innerHTML = datep5String;
    document.querySelector("#p5-icon").innerHTML = getIconString(apiData.daily[5].weather[0].icon);
    document.querySelector("#p5-temp").innerHTML = "Temp: " + apiData.daily[5].temp.day + "\u2109";
    document.querySelector("#p5-wind").innerHTML = "Wind: " + apiData.daily[5].wind_speed + "mph";
    document.querySelector("#p5-humidity").innerHTML = "Humidity: " + apiData.daily[5].humidity+ "%";
};

//display current city weather
var displayCityWeather = function(apiData) {
    var weatherIcon = getIconString(apiData.current.weather[0].icon);
    cityHeaderEl.innerHTML = cityheadername+ "  " +dateStringCurrent+" "+weatherIcon;
    // Temp Wind Humidity UVindex
    currentTempEl.innerHTML = "Temperature: " + apiData.current.temp +	"\u2109";
    currentWindEl.innerHTML = "Wind Speed: " + apiData.current.wind_speed + "mph";
    currentHumidityEl.innerHTML = "Humidity: " + apiData.current.humidity +"%";
    //UVI coloring
    var uviColor = "";
    if (apiData.current.uvi < 3.0){
        uviColor = "green";
    }else if (apiData.current.uvi < 7.0) {
        uviColor = "orange";
    } else {
        uviColor = "red";
    }
    currentUviEl.innerHTML = "UV Index: <span style='background-color:"+uviColor+"; color:white; padding:5px;'>" + apiData.current.uvi + "</span>";
    displayForcast(apiData);

};


//call api, api key [af1fe444e221932e7a28cfd9959741e1]
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var getCityWeather = function(city) {
    //going to call api twice, once for lat and longitude of city, then for weather and forcast
    var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=af1fe444e221932e7a28cfd9959741e1";
    fetch(apiUrl1).then(function(response1) {
        if (response1.ok) {
            response1.json().then(function(data1) {
                var lon = data1.coord.lon;
                var lat = data1.coord.lat;
                cityheadername = data1.name;

                //call search history method
                appendSearchHistory(cityheadername);
                saveSearchHistory();

                //second call, gets weather and forcast including uv index, calling by city does not for some reason
                //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
                var apiUrl2 = "https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=hourly,minutely&appid=af1fe444e221932e7a28cfd9959741e1";
                fetch(apiUrl2).then(function(response2) {
                    if (response2.ok) {
                        response2.json().then(function(data2) {
                            //console.log(data2);
                            displayCityWeather(data2);
                        });
                    } else {
                        alert("error");
                    }
                });
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
        searchInputEl.value = "";
    }
};

//load local storage
loadSearchHistory();

//add event listeners 
formEl.addEventListener("submit",formSubmitHandler);
searchHistoryUlEl.addEventListener("click",searchHistoryHandler);



