const key = process.env.REACT_APP_WEATHER_KEY;
const weather_url = `https://api.openweathermap.org/data/2.5/`;
const one_call_url = `https://api.openweathermap.org/data/3.0/`;

export const gpsURL = (lat, lon) =>
  `${weather_url}weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

export const searchURL = (city) =>
  `${weather_url}weather?q=${city}&units=imperial&appid=${key}`;

export const forecastURL = (lat, lon) =>
  `${one_call_url}onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
