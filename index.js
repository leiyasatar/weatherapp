document.addEventListener("DOMContentLoaded", function () {
  let now = new Date();
  let tDate = document.querySelector("#date");
  let tTime = document.querySelector("#time");
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  tDate.innerHTML = `${day}, ${date} ${month} ${year}`;
  tTime.innerHTML = `${hours}:${minutes}`;
});

// Add event listener for form submission
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", searching);

// Add event listener for current location button
const currentLocationButton = document.getElementById(
  "current-location-button"
);
currentLocationButton.addEventListener("click", getCurrentLocation);

function searching(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#location-form");
  cityElement.innerHTML = cityInput.value;
  getWeatherData(cityInput.value);
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeatherDataByCoordinates(latitude, longitude);
}

function handleGeoError(error) {
  console.log("Geolocation error:", error);
}

function getWeatherData(city) {
  const apiKey = "516b6aa5f906aa3ba81d879c2d6c43cf"; // Your API key from OpenWeatherMap
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      const weatherData = response.data;
      updateWeatherInfo(weatherData);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateWeatherInfo(weatherData) {
  const temperatureElement = document.getElementById("temperature");
  const windSpeedElement = document.getElementById("wind-speed");
  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  const weatherIconElement = document.getElementById("weather-icon");

  const temperature = weatherData.main.temp;
  const roundedTemperature = roundTemperature(temperature);
  temperatureElement.innerHTML = `${roundedTemperature} °C`;

  const windSpeed = weatherData.wind.speed;
  windSpeedElement.innerHTML = `Wind Speed: ${windSpeed} m/s`;

  const weatherDescription = weatherData.weather[0].description;
  weatherDescriptionElement.innerHTML = `Weather Description: ${weatherDescription}`;

  const weatherIconCode = weatherData.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
  weatherIconElement.innerHTML = `Weather Icon: <img src="${weatherIconUrl}" alt="${weatherDescription}">`;
}

function roundTemperature(temperature) {
  return Math.round(temperature);
}

const celsiusButton = document.getElementById("c-temp");
const fahrenheitButton = document.getElementById("f-temp");

celsiusButton.addEventListener("click", function () {
  updateTemperatureUnit("Celsius");
});

fahrenheitButton.addEventListener("click", function () {
  updateTemperatureUnit("Fahrenheit");
});

function searching(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#location-form");
  cityElement.innerHTML = cityInput.value;
  getWeatherData(cityInput.value);
}
function updateTemperatureUnit(unit) {
  const temperatureElement = document.getElementById("temperature");
  let temperature = parseFloat(temperatureElement.innerText);
  if (unit === "Celsius") {
    // Convert to Celsius
    temperature = ((temperature - 32) * 5) / 9;
  } else {
    // Convert to Fahrenheit
    temperature = (temperature * 9) / 5 + 32;
  }
  temperatureElement.innerHTML = `${temperature.toFixed(2)} ${unit}`;
}
