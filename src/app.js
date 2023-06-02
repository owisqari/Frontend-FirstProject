const getWeatherData = async (city) => {
  if (city === "") {
    alert("Please enter a city");
    return;
  }
  const OPEN_WEATHER_MAP_API_KEY = "6eb1180161eccb06843669dbee0f87b3";
  const req = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  const res = await fetch(req);
  const data = await res.json();
  if (data.cod === "404") {
    alert("Please enter a valid city");
    return;
  } else {
    const weatherData = {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      wind: data.wind.speed,
      city: data.name,
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

// event listener for search button
searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  const getData = async () => {
    const weatherData = await getWeatherData(city);
    temperature.textContent = `${weatherData.temperature}°C`;
    condition.textContent = weatherData.condition;
    wind.textContent = `${weatherData.wind} m/s`;
    city.textContent = weatherData.city;
  };
  getData();
});
