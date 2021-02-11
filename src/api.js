//const proxy = "https://cors-anywhere.herokuapp.com/";

const key = process.env.REACT_APP_WEATHER_KEY;
const base_url = `https://api.openweathermap.org/data/2.5/`;

export const searchURL = (city) =>
  `${base_url}weather?q=${city}&units=imperial&appid=${key}`;

export const forecastURL = (lat, lon) =>
  `${base_url}onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

// dropped ${proxy} before base_url
//   const wetter = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=London,GB&units=imperial&appid=d17b9addcfd56e9be355e565516aee43");
