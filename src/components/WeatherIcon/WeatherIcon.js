import React from "react";
import { WiDayCloudy } from "weather-icons-react";

function Weathericon({ isDay }) {
  console.log(isDay);
  const iconSize = 72;
  const iconColor = "#000";
  const iconDisplay = (isDay) => {};
  if (isDay) {
    return <WiDayCloudy size={iconSize} color={iconColor} />;
  } else {
    return <h1>Noc</h1>;
  }
}

export default Weathericon;
