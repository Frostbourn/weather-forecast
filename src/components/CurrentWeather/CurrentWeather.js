import React, { useState, useEffect } from "react";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

const CurrentWeather = ({ lat, lng }) => {
  //console.log(state)
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://abdevel.meteo.pl/aW59mjFN8M/fcst?lat=${lat}&lon=${lng}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.forecasts);
        console.log(data.forecasts);
      });
  }, [lat, lng]);

  // const handleInputChange = (event, value) => {
  //   value ? setQuery(value) : ""; /* eslint-disable-line */
  // };

  // const handleChange = (event, value) => {
  //   state(value);
  // };

  return (
    <div>
      <p></p>
    </div>
  );
};

export default CurrentWeather;
