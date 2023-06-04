const alertBox = document.getElementById("alertBox");

// get weather data from openweathermap.org
const getWeatherData = async (city) => {
  if (city === "") {
    alertBox.classList.remove("hidden");
    document.getElementById("searchDetails").classList.add("hidden");

    return;
  }
  const OPEN_WEATHER_MAP_API_KEY = "6eb1180161eccb06843669dbee0f87b3";
  const req = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  const res = await fetch(req);
  const data = await res.json();
  if (data.cod === "404") {
    alertBox.classList.remove("hidden");
    document.getElementById("searchDetails").classList.add("hidden");
    return;
  } else {
    alertBox.classList.add("hidden");
    const weatherData = {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      wind: data.wind.speed,
      city: data.name,
      humidity: data.main.humidity,
    };
    return weatherData;
  }
};

// input feilds
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// display feilds
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const wind = document.getElementById("wind");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");

// event listener for search button
searchBtn.addEventListener("click", async () => {
  const getData = async () => {
    const weatherData = await getWeatherData(searchInput.value);
    temperature.textContent = `${Math.round(weatherData.temperature)}°C`;
    if (weatherData.condition === "Clouds") {
      document.getElementById("conditionIcon").className =
        "fa-solid fa-cloud fa-8x";
    } else if (weatherData.condition === "Clear") {
      document.getElementById("conditionIcon").className =
        "fa-solid fa-cloud-sun fa-8x";
    } else if (weatherData.condition === "Rain") {
      document.getElementById("conditionIcon").className =
        "fa-solid fa-cloud-rain fa-8x";
    } else if (weatherData.condition === "Snow") {
      document.getElementById("conditionIcon").className =
        "fa-solid fa-snowflake fa-8x";
    } else {
      condition.textContent = weatherData.condition;
    }
    wind.textContent = `${weatherData.wind} m/s`;
    city.textContent = weatherData.city;
    humidity.textContent = `${weatherData.humidity}%`;
    document.getElementById("searchDetails").classList.remove("hidden");
  };
  getData();
});

// Popular City Card Create
const getPopularData = async () => {
  // Its called onload from body tag
  let popualrCities = ["paris", "riyadh", "jeddah"];
  // it loops finding the elements Ids and inserting data
  for (let i = 1; i <= 3; i++) {
    const weatherData = await getWeatherData(popualrCities[i - 1]);
    document.getElementById(`temperatureP${i}`).textContent = `${Math.round(
      weatherData.temperature
    )}°C`;
    if (weatherData.condition === "Clouds") {
      document.getElementById(`conditionIconP${i}`).className =
        "fa-solid fa-cloud fa-6x";
    } else if (weatherData.condition === "Clear") {
      document.getElementById(`conditionIconP${i}`).className =
        "fa-solid fa-cloud-sun fa-6x";
    } else if (weatherData.condition === "Rain") {
      document.getElementById(`conditionIconP${i}`).className =
        "fa-solid fa-cloud-rain fa-6x";
    } else if (weatherData.condition === "Snow") {
      document.getElementById(`conditionIconP${i}`).className =
        "fa-solid fa-snowflake  fa-6x";
    } else {
      document.getElementById(`conditionIconP${i}`).textContent =
        weatherData.condition;
    }
    document.getElementById(
      `windP${i}`
    ).textContent = `${weatherData.wind} m/s`;
    document.getElementById(`cityP${i}`).textContent = weatherData.city;
    document.getElementById(
      `humidityP${i}`
    ).textContent = `${weatherData.humidity}%`;
  }
};
