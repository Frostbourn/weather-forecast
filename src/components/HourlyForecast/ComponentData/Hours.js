import React from "react";

const Hours = ({ data }) => {
  const forecast =
    data.hourly &&
    !!data.hourly.length &&
    data.hourly
      .filter((item) => {
        let date = new Date();
        let dateAPI = new Date(item.dateTime);
        const now = dateAPI >= date;
        return now;
      })
      .slice(0, 48)
      .map((item, index) => {
        return (
          <span className="font-bold p-3">
            {new Date(item.dateTime).toLocaleString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      });
  return <p className="hours">{forecast ? forecast : "Loading..."}</p>;
};

export default Hours;
