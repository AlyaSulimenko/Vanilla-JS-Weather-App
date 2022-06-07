//Multiplying the items in forecast with fake data
let formatForecastDays = function (timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let nextDay = days[date.getDay()];
  return nextDay;
};

let displayAllForecastItems = function (response) {
  let forecast = response.data.daily;
  let forecastContent = document.querySelector("#forecast-wrapper");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDayOfWeek, index) {
    if (index > 0 && index < 6) {
      let smallIcon = " ";
      if (
        forecastDayOfWeek.weather[0].main === "Rain" ||
        forecastDayOfWeek.weather[0].main === "Drizzle"
      ) {
        smallIcon = `<i class="fa-solid fa-cloud-showers-heavy icon_small"></i>`;
      } else if (forecastDayOfWeek.weather[0].main === "Clouds") {
        smallIcon = `<i class="fa-solid fa-cloud icon_small"></i>`;
      } else if (forecastDayOfWeek.weather[0].main === "Clear") {
        smallIcon = `<i class="fa-solid fa-sun icon_small"></i>`;
      } else if (forecastDayOfWeek.weather[0].main === "Snow") {
        smallIcon = `<i class="fa-solid fa-snowflake icon_small"></i>`;
      } else if (forecastDayOfWeek.weather[0].main === "Thunder") {
        smallIcon = `<i class="fa-solid fa-cloud-bolt icon_small"></i>`;
      } else if (forecastDayOfWeek.weather[0].main === "Tornado") {
        smallIcon = `<i class="fa-solid fa-tornado icon_small"></i>`;
      } else {
        smallIcon = `<i class="fa-solid fa-smog icon_small"></i>`;
      }
      forecastHTML =
        forecastHTML +
        `<div class="col forecast__item">
            <div class="forecast__day">${formatForecastDays(
              forecastDayOfWeek.dt
            )}</div>
            <div class="forecast__icon">${smallIcon}
            </div>
            <div class="forecast__temperature">${Math.round(
              forecastDayOfWeek.temp.max
            )}°C</div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastContent.innerHTML = forecastHTML;
};

//Displaying the real forecast
let getForecast = function (coordinates) {
  let key = "fb1611332d773db8e6829690cdae2059";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(forecastApiUrl).then(displayAllForecastItems);
};

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
  getForecast(response.data.coord);
};

//icon stuff
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
//end of icon stuff

let showCurrentCity = function (city) {
  let key = "fb1611332d773db8e6829690cdae2059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(displayWeatherIcon);
};
let showSearchedCity = function (event) {
  event.preventDefault();
  let searchedСity = document.querySelector("#search-input");
  showCurrentCity(searchedСity.value);
};

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showSearchedCity);

showCurrentCity("Malmo");

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

//Converter from C to F and back
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
