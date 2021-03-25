const initState = {
  location: null,
  current: null,
  daily: [],
  hourly: [],
  error: null,
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
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        location: null,
        current: null,
        daily: [],
        hourly: [],
      };
    default:
      return { ...state };
  }
};

export default weatherReducer;
