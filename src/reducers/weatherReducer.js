const initState = {
  error: null,
  location: null,
  current: null,
  daily: [],
  hourly: [],
  loading: true,
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
        loading: false,
        error: null,
      };
    case "SHOW_LOADER":
      return {
        ...state,
        loading: true,
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
