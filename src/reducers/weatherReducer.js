const initState = {
  error: null,
  location: null,
  current: null,
  daily: [],
  hourly: [],
  alerts: [],
  loading: true,
  showAlerts: false,
};

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_WEATHER":
      return {
        ...state,
        location: action.payload.location,
        current: action.payload.current,
        daily: action.payload.daily,
        hourly: action.payload.hourly,
        alerts: action.payload.current.alerts,
        loading: false,
        error: null,
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    case "TOGGLE_SHOW_ALERTS":
      return {
        ...state,
        showAlerts: !state.showAlerts,
      };
    default:
      return { ...state };
  }
};

export default weatherReducer;
