import React from "react";

const Drops = ({ data }) => {
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
          <span
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
              {item.rain + item.snow > 0 ? item.rain + item.snow : ""}
            </span>
          </span>
        );
      });
  return <p className="drops">{forecast ? forecast : "Loading..."}</p>;
};

export default Drops;
