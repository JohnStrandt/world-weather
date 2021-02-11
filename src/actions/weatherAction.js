import axios from "axios";
import { searchURL, forecastURL } from "../api";

export const getWeather = (city) => async (dispatch) => {
  const todaysWeather = await axios.get(searchURL(city));
  let lat = todaysWeather.data.coord.lat;
  let lon = todaysWeather.data.coord.lon;
  const forecastWeather = await axios.get(forecastURL(lat, lon));

  let location = {
    city: todaysWeather.data.name,
    country: todaysWeather.data.sys.country,
    timezone: todaysWeather.data.timezone,
  };

  let current = {
    ...forecastWeather.data.current,
    high_temp: todaysWeather.data.main.temp_max,
    low_temp: todaysWeather.data.main.temp_min,
    alerts: forecastWeather.data.alerts,
  };

  dispatch({
    type: "FETCH_WEATHER",
    payload: {
      location: location,
      current: current,
      daily: forecastWeather.data.daily,
      hourly: forecastWeather.data.hourly,
    },
  });
};
