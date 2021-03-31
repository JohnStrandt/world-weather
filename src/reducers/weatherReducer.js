const initState = {
  error: null,
  location: null,
  current: null,
  daily: [],
  hourly: [],
  // dataLoaded: false,
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
        // dataLoaded: true,
        error: null,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        error: null,
        location: null,
        current: null,
        daily: [],
        hourly: [],
        // dataLoaded: false,
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};

export default weatherReducer;
