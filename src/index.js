// Weather in current place(without icon)
let displayWeather = function (response) {
  let actCity = document.querySelector("#actual-city");
  let actTemp = document.querySelector("#actual-temp");
  let actHumidity = document.querySelector("#actual-humidity");
  let actWind = document.querySelector("#actual-wind");
  let actCond = document.querySelector("#actual-conditions");

  actCity.innerHTML = response.data.name;
  actTemp.innerHTML = Math.round(response.data.main.temp);
  actHumidity.innerHTML = response.data.main.humidity;
  actWind.innerHTML = response.data.wind.speed;
  actCond.innerHTML = response.data.weather[0].description;
  console.log(response);
};
let showCurCity = function (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "fb1611332d773db8e6829690cdae2059";
  let curUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(curUrl).then(displayWeather);
};

navigator.geolocation.getCurrentPosition(showCurCity);

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
