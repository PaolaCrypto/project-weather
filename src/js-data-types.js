let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let time = document.querySelector("h3");
time.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#forecast-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#forecast-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#forecast-pressure").innerHTML =
    response.data.main.pressure;
  let iconElement = document.querySelector("#icon");
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = response.data.main.temp;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input-text");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  let city = document.querySelector("#search-input-text").value;

  let apiKey = `08e5539ad92b0b58141d7bea040430fd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
let celciusTemperature = null;

let form = document.querySelector("#form-id");
form.addEventListener("submit", search);

function convertToFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = `08e5539ad92b0b58141d7bea040430fd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);
