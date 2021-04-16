import React from "react";
import { WiDayCloudy, WiNightAltPartlyCloudy } from "weather-icons-react";

const Weathericon = ({ isDay }) => {
  //console.log(isDay);
  const iconSize = 72;
  const iconColor = "#000";
  const iconDisplay = (isDay) => {};
  if (isDay) {
    return <WiDayCloudy size={iconSize} color={iconColor} />;
  } else {
    return <WiNightAltPartlyCloudy size={iconSize} color={iconColor} />;
  }
};

export default Weathericon;
