//current time//
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
  return `${currentDate}, ${hours}:${minutes}`;
}
let now = new Date();
let h4 = document.querySelector("h4");
h4.innerHTML = formatDate(now);
//search//

//bonus//
function convertCelsius(event) {
  event.preventDefault();
  let temperatureConvert = document.querySelector("#temperature");
  temperatureConvert.innerHTML = 27;
}
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureConvert = document.querySelector("#temperature");
  temperatureConvert.innerHTML = 80.6;
}
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
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let temperatureNow = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperatureNow}ºC`;
}
search.addEventListener("submit", citySearch);
// bonus search
let currentButton = document.querySelector("#current-search");
function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function getGps() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
currentButton.addEventListener("click", getGps);
