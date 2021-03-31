export const iconStyle = (icon) => {
  let style = `owi owi-${icon}`;
  if (icon === "01d") style = `owi owi-${icon} sun`;
  return style;
};
