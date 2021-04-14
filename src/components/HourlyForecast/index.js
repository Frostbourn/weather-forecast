import React from "react";

const HorlyForecast = ({ data }) => {
  console.log(data);

  const forecast =
    // data &&
    // !!data.length &&
    data.hourly.slice(0, 23).map((day, index) => {
      //   let date = new Date();
      //   let date2 = new Date(day.dateTime);
      //   if (date.getHours() === date2.getHours()) {
      return (
        <div key={index} className="column">
          <p className="font-bold">
            {new Date(day.dateTime).toLocaleString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>{day.temperature}</p>
          <p>{day.rain}</p>
          <p>{day.snow}</p>
        </div>
      );
      //   } else {
      //     <div>BŁĄD</div>;
      //}
    });
  //let content = forecast.length && forecast;
  return (
    <div className="hourly-forecast">{forecast ? forecast : "Loading..."}</div>
  );
};

export default HorlyForecast;
