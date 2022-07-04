function formatDate(timestamp) {
  let date = new Date(timestamp);
  let time = date.toLocaleString([], {hour: '2-digit', minute:'2-digit'})
  let daze = new Date().toLocaleDateString();
  let days = [
      `Sunday`,
      `Monday`,
      `Tuesday`,
      `Wednesday`,
      `Thursday`,
      `Friday`,
      `Saturday`
    ];
    let day = days[date.getDay()];
    return `${daze}, ${day} ${time}`;
  }
  
  
  
  function showForecast(response) {
    let forecastDaily = response.data.daily;

    let forecast = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecastDaily.forEach(function (forecastDaily) {
      forecastHTML =
      forecastHTML + `
      <div class="col-2">
        <div class="forecast-date">${forecastDaily.dt}</div>
        <img 
          src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png";
          alt=""
          width="42"
        />

        <div class="forecast-temp">
          <span class="forecast-temp-max">
          ${forecastDaily.temp.max}° </span> "|"
          <span class="forecast-temp-min">
          ${forecastDaily.temp.min}°</span>
        </div>
      </div>
      `;
    });
    
    
forecastHTML = forecastHTML + `</div>`;
forecast.innerHTML = forecastHTML;
console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6b489563a4848d8f1450e42485d692d9";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showForecast);
}



function displayWeather(response) {
  fahrenheitTemp = response.data.main.temp;
  
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  //document.querySelector("#state").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
  console.log(response);
  
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#smDescript").innerHTML =
  response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
    
  getForecast(response.data.coord);


  }
  
  function searchLocation(position) {
     let lat = position.coords.latitude;
     let long = position.coords.longitude;
     let apiKey = "d902024a317251111d53edabb971cc42";
     let units = `imperial`;
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
     axios.get(apiUrl).then(displayWeather);
   }
  
function searchCity(city) {
  let apiKey = "6b489563a4848d8f1450e42485d692d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function hitSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#place-search").value;
  searchCity(city);
}

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemp = (fahrenheitTemp - 32) * 5/9;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
}

function showfahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
}

function userLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentWeather = document.querySelector("#local-search");
currentWeather.addEventListener("click", userLocation);

let form = document.querySelector("#search-city");
form.addEventListener("submit", hitSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheit);

searchCity("Turks and Caicos Islands");

