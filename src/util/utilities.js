// converts numeric directions in degrees to text based
export const windDirection = (degrees) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  let index = Math.round(degrees / 22.5);
  return directions[index];
};
