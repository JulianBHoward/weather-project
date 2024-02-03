const apiKey = "0dc56170d9065926c36630f0dff6ee44"

function requestWeatherData(city) {
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

  fetch(weatherUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(weatherData) {
      showWeather(weatherData);
      requestFiveDayForecast(city);
    });
}

function requestFiveDayForecast(city) {

  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

  fetch(forecastUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(forecastData) {
      displayFiveDayForecast(forecastData);
    });
}

function displayFiveDayForecast(forecastData) {
  var fiveDayContainer = document.querySelector('.five-day-container');
  fiveDayContainer.innerHTML = '';

  for (var i = 0; i < 40; i += 8) {
    var forecastInfo = forecastData.list[i];
    var dayOfWeek = getDayOfWeek(forecastInfo.dt_txt);
    var temperature = Math.floor(forecastInfo.main.temp);
    var description = forecastInfo.weather[0].description;

    var dayForecastHTML = '<div class="day-forecast">' +
      '<h4>' + dayOfWeek + '</h4>' +
      '<h3>' + temperature + ' °F</h3>' +
      '<h5>' + description + '</h5>' +
      '</div>';

    fiveDayContainer.insertAdjacentHTML('beforeend', dayForecastHTML);
  }
}

function getDayOfWeek(day) {
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var date = new Date(day);
  var dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
}

function showWeather(weatherData) {
  var weatherContainer = document.querySelector('.weather-container');
  weatherContainer.innerHTML = '';

  var weatherHTML = '<h3>' + weatherData.name + '</h3>' +
    '<h2>' + Math.floor(weatherData.main.temp) + ' °F</h2>' +
    '<h4>' + weatherData.weather[0].description + '</h4>' +
    '<img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png" alt="">';

  weatherContainer.insertAdjacentHTML('beforeend', weatherHTML);
}

function performSearch() {
  var cityInput = document.querySelector('.form-control');
  var cityName = cityInput.value;
  if (cityName) {
    requestWeatherData(cityName);
  } else {
    alert('Please enter a city name.');
  }
}

document.querySelector(".search").addEventListener("click", function() {
  performSearch();
  textbox.value = "";
});