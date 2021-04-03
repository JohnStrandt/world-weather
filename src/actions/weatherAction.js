import axios from "axios";
import { searchURL, forecastURL, gpsURL } from "../api";

export const getWeather = (city) => async (dispatch) => {
  let todaysWeather = null;

  await axios
    .get(searchURL(city))
    .then((res) => {
      todaysWeather = res;
    })
    .catch((e) => {
      dispatch({
        type: "SEARCH_ERROR",
        payload: {
          error: {
            code: e.response.data.cod,
            message: e.response.data.message,
            city: city,
          },
        },
      });
    });

  if (todaysWeather) {
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
  }
};

export const getGPSWeather = (lat, lon) => async (dispatch) => {
  const todaysWeather = await axios.get(gpsURL(lat, lon));
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

export const showLoader = () => (dispatch) => {
  dispatch({
    type: "SHOW_LOADER",
  });
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: "HIDE_LOADER",
  });
};
