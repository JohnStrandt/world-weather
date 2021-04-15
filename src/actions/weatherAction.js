import axios from "axios";
import { searchURL, forecastURL, gpsURL } from "../api";
import { unixToLocalTime, getWeekday, getHour } from "../util/time";

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
      low_temp: todaysWeather.data.main.temp_min, // not displaying temps anymore
      alerts: forecastWeather.data.alerts,
    };

    let hourlyData = createHourlyForecastArray(
      forecastWeather.data.hourly,
      todaysWeather.data.timezone
    );

    dispatch({
      type: "FETCH_WEATHER",
      payload: {
        location: location,
        current: current,
        daily: forecastWeather.data.daily,
        hourly: hourlyData,
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
    high_temp: todaysWeather.data.main.temp_max, // not displaying temps anymore
    low_temp: todaysWeather.data.main.temp_min,
    alerts: forecastWeather.data.alerts,
  };

  let hourlyData = createHourlyForecastArray(
    forecastWeather.data.hourly,
    todaysWeather.data.timezone
  );

  dispatch({
    type: "FETCH_WEATHER",
    payload: {
      location: location,
      current: current,
      daily: forecastWeather.data.daily,
      hourly: hourlyData,
    },
  });
};

const createHourlyForecastArray = (hourlyWeather, tz) => {
  const hourlyForecast = [];

  const getDay = (timeStamp) => {
    return getWeekday(unixToLocalTime(timeStamp, tz));
  };

  let currentDay = "";
  let dayIndex = -1;

  hourlyWeather.forEach((hour) => {
    if (getDay(hour.dt) !== currentDay) {
      dayIndex++;
      currentDay = getDay(hour.dt);
      hourlyForecast[dayIndex] = {};
      hourlyForecast[dayIndex].label = currentDay;
      hourlyForecast[dayIndex].hours = [];
    }

    hourlyForecast[dayIndex].hours.push({
      time: getHour(unixToLocalTime(hour.dt, tz)),
      icon: hour.weather[0].icon,
      temp: Math.round(hour.temp),
    });
  });

  hourlyForecast[0].label = "Today";
  hourlyForecast[1].label = "Tomorrow";

  return hourlyForecast;
};
