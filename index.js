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

//Replace Farenheit

function convertToF(event) {
  event.preventDefault();
  let ftemp = document.querySelector("#curr-temp");
  ftemp.innerHTML = "59";
}

// let faren = document.querySelector("#f-temp");
// faren.addEventListener("click", convertToF);

// function convertToC(event) {
//   event.preventDefault();
//   let ctemp = document.querySelector("#curr-temp");
//   ctemp.innerHTML = "15";
// }

// let celc = document.querySelector("#c-temp");
// celc.addEventListener("click", convertToC);

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
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=516b6aa5f906aa3ba81d879c2d6c43cf`;
  axios
    .get(apiUrl)
    .then(function (response) {
      const temperature = response.data.main.temp;
      const roundedTemperature = roundTemperature(temperature); // Round off the temperature
      const temperatureElement = document.querySelector("#temperature");
      temperatureElement.innerHTML = `${roundedTemperature} °C`; // Display the rounded temperature
    })
    .catch(function (error) {
      console.log(error);
    });

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

  function getWeatherDataByCoordinates(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=516b6aa5f906aa3ba81d879c2d6c43cf`;
    axios
      .get(apiUrl)
      .then(function (response) {
        const city = response.data.name;
        const temperature = response.data.main.temp;
        const cityElement = document.querySelector("#city");
        const temperatureElement = document.querySelector("#temperature");
        cityElement.innerHTML = city;
        temperatureElement.innerHTML = `${temperature}°C`;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function roundTemperature(temperature) {
    return Math.round(temperature);
  }
  document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const locationForm = document.getElementById("location-form");
    const cityElement = document.getElementById("city");
    const currentLocationButton = document.getElementById(
      "current-location-button"
    );

    // Function to update the city name in the <h1> element
    function updateCityName(cityName) {
      cityElement.textContent = cityName;
    }

    // Event listener for form submission
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page reload

      const city = locationForm.value;
      // Replace "YOUR_API_KEY" with your actual API key from OpenWeatherMap
      const apiKey = "516b6aa5f906aa3ba81d879c2d6c43cf";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      // Make an API call to get weather data
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            updateCityName(data.name);
            // You can also update other weather-related elements here
          } else {
            updateCityName("City Not Found");
            // Handle error cases here
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          updateCityName("Error");
          // Handle error cases here
        });
    });

    // Event listener for "Current Location" button click
    currentLocationButton.addEventListener("click", () => {
      updateCityName("Your Current Location");
      // Add code to get the weather data for the user's current location if needed
    });
  });
}
