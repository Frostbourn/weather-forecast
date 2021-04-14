import React, { useState, useEffect } from "react";
import { WiWindDeg } from "weather-icons-react";

const HourlyForecast = ({ data }) => {
  //console.log(data);
  const filteredFromNow =
    data.hourly &&
    !!data.hourly.length &&
    data.hourly.filter((item) => {
      let date = new Date();
      let date2 = new Date(item.dateTime);
      return date2 >= date;
    });
  console.log(filteredFromNow);
  const forecast =
    filteredFromNow &&
    !!filteredFromNow &&
    filteredFromNow.slice(0, 48).map((item, index) => {
      return (
        <div key={index} className="column border-solid border border-gray-50">
          <p className="font-bold pt-3">
            {new Date(item.dateTime).toLocaleString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="p-3">{Math.round(item.temperature)}º</p>
          <p
            className="rain p-3"
            style={{
              paddingBottom: `${
                Math.round((item.rain + item.snow) * 10) + 1
              }px`,
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
              {item.rain + item.snow > 0
                ? (item.rain + item.snow).toFixed(1)
                : ""}
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
          <p className="p-3">{item.groundPressure}</p>
        </div>
      );
    });
  return <div className="hourly-forecast">{forecast}</div>;
};

export default HourlyForecast;
