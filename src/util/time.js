export const getCurrentTime = (timezone) => {
  let localMachineTime = new Date();
  let unixMachineTime = localMachineTime.valueOf();
  let localMachineOffset = localMachineTime.getTimezoneOffset() * 60;
  let tzDifference = (localMachineOffset + timezone) * 1000;
  let currentTime = new Date(unixMachineTime + tzDifference);

  return currentTime.toString().substring(0, 24);
};

export const dateAndTime = (dateString) => {
  let date = dateString.substring(0, 10);
  let time = formatTime(dateString);
  return `${date} ${time}`;
};

export const getDay = (dateString) => {
  let day = dateString.substring(0, 3);
  let date = dateString.substring(4, 10);
  return `${day}, ${date}`;
};

export const unixToLocalTime = (unixTime, timezone) => {
  let localMachineTime = new Date();
  let localMachineOffset = localMachineTime.getTimezoneOffset() * 60;
  let tzOffset = localMachineOffset + timezone;
  let time = new Date((unixTime + tzOffset) * 1000);

  return time.toString().substring(0, 24);
};

export const formatTime = (dateString) => {
  let time = dateString.substring(16, 21);
  let hour = time.substring(0, 2) * 1;
  let min = time.substring(3, 5);
  let ampm = "AM";
  if (hour >= 12) {
    ampm = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  }
  return `${hour}:${min} ${ampm}`;
};


// today: time, date
// weekdays: day, date