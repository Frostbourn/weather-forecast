import React from "react";
import { WiWindDeg } from "weather-icons-react";

const Wind = ({ data }) => {
  const forecast =
    data.hourly &&
    !!data.hourly.length &&
    data.hourly
      .filter((item) => {
        let date = new Date();
        let date2 = new Date(item.dateTime);
        return date2 >= date;
      })
      .slice(2, 50)
      .map((item, index) => {
        return (
          <>
            <p className="p-3 flex-col bg-gray-50 border-solid border border-gray-100">
              <WiWindDeg
                size={24}
                color={item.windSpeed >= 14 ? "#e7c500" : "#59c100"}
                style={{ transform: `rotate(${item.windDirection}deg)` }}
              />
              <p className="flex justify-center py-4 items-center font-bold bg-gray-50">
                {item.windSpeed}
                <span className="text-xs">km/h</span>
              </p>
            </p>
          </>
        );
      });
  return <p className="wind">{forecast ? forecast : "Loading..."}</p>;
};

export default Wind;
