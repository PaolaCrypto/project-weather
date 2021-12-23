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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-days");
  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (dailyForecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2">
       <div class="weather-forecast-date">${formatDay(
         dailyForecastDay.dt
       )}</div>
       <img
         src="http://openweathermap.org/img/wn/${
           dailyForecastDay.weather[0].icon
         }@2x.png"
         alt="Clear"
         width="36"
       />

       <div class="weather-forecast-temperatures">
         <span class="weather-temperature-max"> ${Math.round(
           dailyForecastDay.temp.max
         )}° </span>
         <span class="weather-temperature-min"> ${Math.round(
           dailyForecastDay.temp.min
         )}° </span>
       </div>
     </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `08e5539ad92b0b58141d7bea040430fd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#forecast-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#forecast-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#forecast-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input-text");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  let city = document.querySelector("#search-input-text").value;

  searchCity(city);
}
function searchCity(city) {
  let apiKey = `08e5539ad92b0b58141d7bea040430fd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}
searchCity("Sigriswil");
let celciusTemperature = null;

let form = document.querySelector("#form-id");
form.addEventListener("submit", search);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = `08e5539ad92b0b58141d7bea040430fd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);
