// Weather in current place(without icon)
let actCity = document.querySelector("#actual-city");
let actTemp = document.querySelector("#actual-temp");
let actHumidity = document.querySelector("#actual-humidity");
let actWind = document.querySelector("#actual-wind");
let actCond = document.querySelector("#actual-conditions");

let displayWeather = function (response) {
  actCity.innerHTML = response.data.name;
  actTemp.innerHTML = Math.round(response.data.main.temp);
  actHumidity.innerHTML = response.data.main.humidity;
  actWind.innerHTML = Math.round(response.data.wind.speed);
  actCond.innerHTML = response.data.weather[0].description;
  console.log(response);
};

//icon
let displayWeatherIcon = function (response) {
  let weatherIconBig = document.querySelector("#actual-icon");
  weatherIconBig.classList.remove(weatherIconBig.classList.item(1));
  if (response.data.weather[0].main === "Clouds") {
    if (actHours < 21 || actHours > 4) {
      weatherIconBig.classList.add("fa-cloud-sun");
    } else {
      weatherIconBig.classList.add("fa-cloud-moon");
    }
  } else if (response.data.weather[0].main === "Clear") {
    if (actHours < 21 || actHours > 4) {
      weatherIconBig.classList.add("fa-sun");
    } else {
      weatherIconBig.classList.add("fa-moon");
    }
  } else if (response.data.weather[0].main === "Drizzle") {
    if (actHours < 21 || actHours > 4) {
      weatherIconBig.classList.add("fa-sun-rain");
    } else {
      weatherIconBig.classList.add("fa-moon-rain");
    }
  } else if (response.data.weather[0].main === "Rain") {
    weatherIconBig.classList.add("fa-cloud-showers-heavy");
  } else if (response.data.weather[0].main === "Snow") {
    weatherIconBig.classList.add("fa-snowflake");
  } else if (response.data.weather[0].main === "Thunder") {
    weatherIconBig.classList.add("fa-cloud-bolt");
  } else if (response.data.weather[0].main === "Tornado") {
    weatherIconBig.classList.add("fa-tornado");
  } else {
    weatherIconBig.classList.add("fa-smog");
  }
};

let showCurCity = function (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "fb1611332d773db8e6829690cdae2059";
  let curUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(curUrl).then(displayWeather);
  axios.get(curUrl).then(displayWeatherIcon);
};
let showActCity = function (event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let key = "fb1611332d773db8e6829690cdae2059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(displayWeatherIcon);
};

navigator.geolocation.getCurrentPosition(showCurCity);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showActCity);

//Current date & time
let today = new Date();
let dayDate = document.querySelector(".main__date");
let time = document.querySelector(".main__time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let actDay = days[today.getDay()];
let actMonth = months[today.getMonth()];
let actDate = today.getDate();
let actHours = today.getHours();
if (actHours < 10) {
  actHours = `0${actHours}`;
}
let actMinutes = today.getMinutes();
if (actMinutes < 10) {
  actMinutes = `0${actMinutes}`;
}
dayDate.innerHTML = `${actDay}, ${actMonth}, ${actDate}`;
time.innerHTML = `${actHours}:${actMinutes}`;

//Converter
let convLink = document.querySelector("#convert-temp");
let actUnits = document.querySelector(".temperature__units");
let actNumber = document.querySelector(".temperature__number");
let convertTemperature = function (event) {
  event.preventDefault();
  if (convLink.textContent === "°F?") {
    actNumber.innerHTML = Math.round(+actNumber.textContent * 1.8 + 32);
    actUnits.innerHTML = `°F /`;
    convLink.innerHTML = `°C?`;
  } else if (convLink.textContent === "°C?") {
    actNumber.innerHTML = Math.round((+actNumber.textContent - 32) / 1.8);
    actUnits.innerHTML = `°C /`;
    convLink.innerHTML = `°F?`;
  }
};
convLink.addEventListener("click", convertTemperature);

//Multiplying the items in forecast with fake data

let displayAllForecastItems = function () {
  let forecastContent = document.querySelector("#forecast-wrapper");
  let forecastHTML = `<div class="row">`;
  let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  daysOfWeek.forEach(function (dayOfWeek) {
    forecastHTML =
      forecastHTML +
      `<div class="col forecast__item">
            <div class="forecast__day">${dayOfWeek}</div>
            <div class="forecast__icon">
              <i class="fa-solid fa-sun icon_small"></i>
            </div>
            <div class="forecast__temperature">20°C</div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastContent.innerHTML = forecastHTML;
};
displayAllForecastItems();

//Season Styling - haven't finished with it though

let seasonalButton = document.querySelector(".search_button");
let seasonalBackground = document.querySelector(".landscape_background");

let seasonalMain = document.querySelector(".main__container");
let seasonalSearch = document.querySelector(".search__container");
let seasonalCredits = document.querySelector(".credits__container");

let seasonalForecast = document.querySelector(".forecast__container");
let showSummer = function () {
  seasonalBackground.classList.add("summer_background");
  seasonalButton.classList.add("summer_button");
  seasonalMain.classList.add("summer");
  seasonalSearch.classList.add("summer");
  seasonalCredits.classList.add("summer");
  seasonalForecast.classList.add("summer");
};
let resetSeason = function () {
  seasonalButton.classList.remove(seasonalButton.classList.item(1));
  seasonalBackground.classList.remove(seasonalBackground.classList.item(1));
  seasonalMain.classList.remove(seasonalMain.classList.item(2));
  seasonalSearch.classList.remove(seasonalSearch.classList.item(2));
  seasonalCredits.classList.remove(seasonalCredits.classList.item(2));
  seasonalForecast.classList.remove(seasonalForecast.classList.item(2));
};

let changeSeasons = function () {
  if (actMonth === "June" || actMonth === "July" || actMonth === "August") {
    resetSeason();
    showSummer();
  } else if (
    actMonth === "September" ||
    actMonth === "October" ||
    actMonth === "November"
  ) {
    resetSeason();
    showAutumn();
  } else if (
    actMonth === "December" ||
    actMonth === "January" ||
    actMonth === "February"
  ) {
    resetSeason();
    showWinter();
  } else if (
    actMonth === "March" ||
    actMonth === "April" ||
    actMonth === "May"
  ) {
    resetSeason();
    showSpring();
  }
};
changeSeasons();
