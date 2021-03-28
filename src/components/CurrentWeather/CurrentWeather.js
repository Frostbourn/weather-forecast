import React, { useState, useEffect } from "react";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

const CurrentWeather = ({ lat, lng, query }) => {
  //console.log(state)
  const [data, setData] = useState([]);
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      await fetch(
        `https://abdevel.meteo.pl/aW59mjFN8M/fcst?lat=${lat}&lon=${lng}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data.forecasts);
          const maxTemp = Math.max.apply(
            Math,
            data.forecasts.hourly.slice(0, 23).map(function (o) {
              return Math.round(o.temperature);
            })
          );
          const minTemp = Math.min.apply(
            Math,
            data.forecasts.hourly.slice(0, 23).map(function (o) {
              return Math.round(o.temperature);
            })
          );
          setMaxTemp(maxTemp);
          setMinTemp(minTemp);
        });
    };
    fetchAPI();
  }, [lat, lng]);

  // const handleInputChange = (event, value) => {
  //   value ? setQuery(value) : ""; /* eslint-disable-line */
  // };

  // const handleChange = (event, value) => {
  //   state(value);
  // };

  return (
    <div>
      <h1>Dzisiaj w {query}</h1>
      <p>Maksymalna temperatura: {maxTemp ? maxTemp : "Wczytuję..."}</p>
      <p>Minimalna temperatura: {minTemp ? minTemp : "Wczytuję..."}</p>
    </div>
  );
};

export default CurrentWeather;
