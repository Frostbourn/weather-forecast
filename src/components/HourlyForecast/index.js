import React, { useState, useEffect } from "react";
import Hours from "./ComponentData/Hours.js";
import TempChart from "./ComponentData/TempChart.js";
import Drops from "./ComponentData/Drops.js";
import Wind from "./ComponentData/Wind.js";
import Pressure from "./ComponentData/Pressure.js";

const HourlyForecast = ({ data }) => {
  return (
    <div className="hourly-forecast">
      <div className="column pt-1.5 border-solid border border-gray-50">
        <Hours data={data} />
        <TempChart data={data} />
        <Drops data={data} />
        <Wind data={data} />
        <Pressure data={data} />
        {/* <p>
        <Hours data={data} />
      </p>  <p className="p-3">{Math.round(item.temperature)}º</p>
      <p
        className="rain p-3"
        style={{
          paddingBottom: `${Math.round((item.rain + item.snow) * 10) + 1}px`,
        }}
      >
        <span
          className="drops text-sm bg-blue-600"
          style={{
            height: `${Math.round((item.rain + item.snow) * 10)}px`,
          }}
        ></span>
        <span
          className="snow bg-blue-400"
          style={{ height: `${Math.round(item.snow * 10)}px` }}
        ></span>
        <span className="text-sm text-blue-600 font-bold">
          {item.rain + item.snow > 0 ? (item.rain + item.snow).toFixed(1) : ""}
        </span>
      </p>
      <p className="flex justify-center w-full py-4 bg-gray-50">
        <WiWindDeg
          size={24}
          color={item.windSpeed >= 14 ? "#e7c500" : "#59c100"}
          style={{ transform: `rotate(${item.windDirection}deg)` }}
        />
      </p>
      <p className="flex justify-center w-full pb-4 items-center font-bold bg-gray-50">
        {Math.round(item.windSpeed)}
        <span className="text-xs">km/h</span>
      </p>
      <p className="p-3">{item.groundPressure}</p> */}
      </div>
    </div>
  );
};

export default HourlyForecast;
