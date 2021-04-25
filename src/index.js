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
  showCityTemp.innerHTML = `in ${cityInput.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
//temperature
function showTemperature(response) {
  let temperatureNow = Math.round(response.data.main.temp);
   let fahrenheitTemperature = `(temperatureNow)* 9 ) /5* 32`;
   temperatureConvert.innerHTML = Math.round(fahrenheitTemperature);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `It is ${temperatureNow}ºC/${fahrenheitTemperature}ºF in ${response.data.name}`;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
}
search.addEventListener("submit", citySearch);