import React, { useState, useEffect } from "react";

const HourlyForecast = ({ data }) => {
  const filteredFromNow =
    data.hourly &&
    !!data.hourly.length &&
    data.hourly.filter((item) => {
      let date = new Date().getHours();
      let date2 = new Date(item.dateTime).getHours();
      return date2 >= date;
    });

  const forecast =
    filteredFromNow &&
    !!filteredFromNow &&
    filteredFromNow.slice(0, 23).map((item, index) => {
      return (
        <div key={index} className="column">
          <p className="font-bold">
            {new Date(item.dateTime).toLocaleString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>{item.temperature}</p>
          <p>{item.rain}</p>
          <p>{item.snow}</p>
        </div>
      );
    });
  return <div className="hourly-forecast">{forecast}</div>;
};

export default HourlyForecast;
