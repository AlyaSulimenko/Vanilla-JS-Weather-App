//Multiplying the items in forecast
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
      let forecastTemp = Math.round(forecastDayOfWeek.temp.max);
      forecastHTML =
        forecastHTML +
        `<div class="col forecast__item">
            <div class="forecast__day">${formatForecastDays(
              forecastDayOfWeek.dt
            )}</div>
            <div class="forecast__icon">${smallIcon}
            </div>
            <div class="forecast__temperature" id="forecast-temp">${forecastTemp} °C</div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastContent.innerHTML = forecastHTML;
};

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

//Seasons Styling (natural way and by clicking on link)
let seasonalInput = document.querySelector("#search-input");
let seasonalButton = document.querySelector("#search-btn");
let seasonalBackground = document.querySelector(".landscape_background");
let seasonalLink = document.querySelector("#link-source");
let seasonalConvert = document.querySelector("#convert-temp");

let seasonalMain = document.querySelector(".main__container");
let seasonalSearch = document.querySelector(".search__container");
let seasonalCredits = document.querySelector(".credits__container");
let seasonalForecast = document.querySelector(".forecast__container");

let linkWinter = document.querySelector("#seasons-winter");
let linkSpring = document.querySelector("#seasons-spring");
let linkSummer = document.querySelector("#seasons-summer");
let linkAutumn = document.querySelector("#seasons-autumn");

let showSummer = function () {
  seasonalBackground.classList.add("summer_background");
  seasonalButton.classList.add("summer_button");
  seasonalInput.classList.add("summer_input");
  seasonalLink.classList.add("summer_link");
  seasonalConvert.classList.add("summer_convert");

  seasonalMain.classList.add("summer");
  seasonalSearch.classList.add("summer");
  seasonalCredits.classList.add("summer");
  seasonalForecast.classList.add("summer");

  linkSpring.classList.add("seasons__item_summer");
  linkSummer.classList.add("seasons__item_summer");
  linkAutumn.classList.add("seasons__item_summer");
  linkWinter.classList.add("seasons__item_summer");
};
let showWinter = function () {
  seasonalBackground.classList.add("winter_background");
  seasonalButton.classList.add("winter_button");
  seasonalInput.classList.add("winter_input");
  seasonalLink.classList.add("winter_link");
  seasonalConvert.classList.add("winter_convert");

  seasonalMain.classList.add("winter");
  seasonalSearch.classList.add("winter");
  seasonalCredits.classList.add("winter");
  seasonalForecast.classList.add("winter");

  linkSpring.classList.add("seasons__item_winter");
  linkSummer.classList.add("seasons__item_winter");
  linkAutumn.classList.add("seasons__item_winter");
  linkWinter.classList.add("seasons__item_winter");
};
let showSpring = function () {
  seasonalBackground.classList.add("spring_background");
  seasonalButton.classList.add("spring_button");
  seasonalInput.classList.add("spring_input");
  seasonalLink.classList.add("spring_link");
  seasonalConvert.classList.add("spring_convert");

  seasonalMain.classList.add("spring");
  seasonalSearch.classList.add("spring");
  seasonalCredits.classList.add("spring");
  seasonalForecast.classList.add("spring");

  linkSpring.classList.add("seasons__item_spring");
  linkSummer.classList.add("seasons__item_spring");
  linkAutumn.classList.add("seasons__item_spring");
  linkWinter.classList.add("seasons__item_spring");
};
let showAutumn = function () {
  seasonalBackground.classList.add("autumn_background");
  seasonalButton.classList.add("autumn_button");
  seasonalInput.classList.add("autumn_input");
  seasonalLink.classList.add("autumn_link");
  seasonalConvert.classList.add("autumn_convert");

  seasonalMain.classList.add("autumn");
  seasonalSearch.classList.add("autumn");
  seasonalCredits.classList.add("autumn");
  seasonalForecast.classList.add("autumn");

  linkSpring.classList.add("seasons__item_autumn");
  linkSummer.classList.add("seasons__item_autumn");
  linkAutumn.classList.add("seasons__item_autumn");
  linkWinter.classList.add("seasons__item_autumn");
};
let resetSeason = function () {
  seasonalButton.classList.remove(seasonalButton.classList.item(1));
  seasonalBackground.classList.remove(seasonalBackground.classList.item(1));
  seasonalInput.classList.remove(seasonalInput.classList.item(1));
  seasonalLink.classList.remove(seasonalLink.classList.item(1));
  seasonalConvert.classList.remove(seasonalConvert.classList.item(1));

  seasonalMain.classList.remove(seasonalMain.classList.item(2));
  seasonalSearch.classList.remove(seasonalSearch.classList.item(2));
  seasonalCredits.classList.remove(seasonalCredits.classList.item(2));
  seasonalForecast.classList.remove(seasonalForecast.classList.item(2));

  linkSpring.classList.remove(linkSpring.classList.item(3));
  linkSummer.classList.remove(linkSummer.classList.item(3));
  linkAutumn.classList.remove(linkAutumn.classList.item(3));
  linkWinter.classList.remove(linkWinter.classList.item(3));
};

let demoWinter = function (event) {
  resetSeason();
  showWinter();
};
let demoSpring = function (event) {
  resetSeason();
  showSpring();
};
let demoSummer = function (event) {
  resetSeason();
  showSummer();
};
let demoAutumn = function (event) {
  resetSeason();
  showAutumn();
};

linkWinter.addEventListener("click", demoWinter);
linkSpring.addEventListener("click", demoSpring);
linkSummer.addEventListener("click", demoSummer);
linkAutumn.addEventListener("click", demoAutumn);

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
