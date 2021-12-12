let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let time = document.querySelector("h3");
time.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response.data.main);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data.weather[0].description);
  let descriptionElement = document.querySelector("#forecast-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
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

let form = document.querySelector("#form-id");
form.addEventListener("submit", search);

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
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
