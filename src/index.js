//current time//
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Latest update: ${currentDate}, ${hours}:${minutes}`;
}
let now = new Date();
let h4 = document.querySelector("h4");
h4.innerHTML = formatDate(now);

//forecast days
function formatDays (timestamp) {
let castDate = new Date(timestamp * 1000);
let day = castDate.getDay();
let castDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
return castDays[day];
}


//forecast
function displayForecast(response) {
  let forecastDaily = response.data.daily;
  let forecastElement  = document.querySelector("#forecast");

  let forecastHTML = `<div class="row align-items-center">`;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 5){
  forecastHTML = forecastHTML + `    
  <div class="col-2">
        <div class="forecastday">${formatDay(forecastDay.dt)} </div>
        <div class="forecasticon"><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon} @2x.png" 
        width=60px alt=""></div>
        <span class="forecast-max-temp">${Math.round(forecastDay.temp.max)}°</span> |
        <span class="forecast-min-temp">${Math.round(forecastDay.temp.min)}°</span>
        </div>
        </div>`;
  }});
   forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

//covertion//
function convertCelsius(event) {
  event.preventDefault();
  let celciusConvert = document.querySelector("#temperature");
  celciusConvert.innerHTML = Math.round(celsiusTemperature);
}
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureConvert = document.querySelector("#temperature");
  let fahrenheitTemperature = `(celsiusTemperature)* 9 ) /5* 32`;
  temperatureConvert.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

//search by city
let search = document.querySelector("#city-search");
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-search");
  let showCityTemp = document.querySelector("#show-city");
  showCityTemp.innerHTML = `${cityInput.value}`;
  let apiKey = "ce4afc8744a0f1fef5bae5142b3fbd94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

//coordinates
function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//temperature
function showTemperature(response) {
  let temperatureNow = Math.round(response.data.main.temp);
   let fahrenheitTemperature = Math.round((temperatureNow)* 9 /5);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `It is ${temperatureNow}ºC/${fahrenheitTemperature}ºF in ${response.data.name}`;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", data.main.temp + "&deg;");

  getForecast(response.data.coord);
}
search.addEventListener("submit", citySearch);

displayForecast();