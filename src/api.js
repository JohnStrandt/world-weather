const proxy = "https://cors-anywhere.herokuapp.com/";
const key = "9a909d04d1e5f28bc051154f7307bdb7";
const base_url = `api.openweathermap.org/data/2.5/`;


export const searchURL = (city) =>`${proxy}${base_url}weather?q=${city}&units=imperial&appid=${key}`;

export const forecastURL = (lat, lon) => `${proxy}${base_url}onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;