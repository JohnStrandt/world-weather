const proxy = "https://cors-anywhere.herokuapp.com/";
const key = process.env.REACT_APP_WEATHER_KEY;
const base_url = `api.openweathermap.org/data/2.5/`;

export const searchURL = (city) =>
  `${proxy}${base_url}weather?q=${city}&units=imperial&appid=${key}`;

export const forecastURL = (lat, lon) =>
  `${proxy}${base_url}onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
