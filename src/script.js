function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let daze = date.getDay();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`
  ];
  let day = days[daze];
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#smDescript").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "6b489563a4848d8f1450e42485d692d9";
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function hitSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#place-search").value;
  searchCity(city);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", hitSubmit);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "d902024a317251111d53edabb971cc42";
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function userLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentWeather = document.querySelector("#current-search");
currentWeather.addEventListener("click", userLocation);

searchCity("Turks and Caicos Islands");
