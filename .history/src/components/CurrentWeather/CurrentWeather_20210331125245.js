import React, { useState, useEffect } from "react";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

const CurrentWeather = ({ lat, lng, query }) => {
  //console.log(state)
  const [data, setData] = useState([]);
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [rain, setRain] = useState();
  const [wind, setWind] = useState();

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
            data.forecasts.hourly
              .slice(0, 23)
              .map((o) => Math.round(o.temperature))
          );
          const minTemp = Math.min.apply(
            Math,
            data.forecasts.hourly
              .slice(0, 23)
              .map((o) => Math.round(o.temperature))
          );
          const rain = data.forecasts.hourly
            .slice(0, 23)
            .map((o) => Math.round(o.rain))
            .reduce((prev, curr) => prev + curr, 0);

          const wind = Math.max.apply(
            Math,
            data.forecasts.hourly
              .slice(0, 23)
              .map((o) => Math.round(o.windSpeed))
          );
          console.log(wind);
          setMaxTemp(maxTemp);
          setMinTemp(minTemp);
          setRain(rain);
          setWind(wind);
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
      <p>Opady: {rain ? rain + "mm" : "Wczytuję..."}</p>
      <p>Prędkość wiatru: {wind ? wind + "km/h" : "Wczytuję..."}</p>
    </div>
  );
};

export default CurrentWeather;
