import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchBox = ({ state }) => {
  const [query, setQuery] = useState("Warszawa");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiZnJvc3Rib3VybiIsImEiOiJja2x0aTl4OWQwOHluMndvMzA1bXBicDBiIn0.8GtwA1s3m5hqxxgRpaaU4Q`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [query]);

  const handleInputChange = (event, value) => {
    value ? setQuery(value) : ""; /* eslint-disable-line */
  };

  const handleChange = (event, value) => {
    state(value);
  };

  return (
    <Autocomplete
      style={{ width: 300 }}
      options={data.features}
      autoHighlight
      getOptionLabel={(option) => (option.text ? option.text : "")}
      getOptionSelected={(option, value) => option.text === value.text}
      onInputChange={handleInputChange}
      onChange={handleChange}
      renderOption={(option) => <>{option.place_name}</>}
      renderInput={(params) => (
        <TextField {...params} label="Wybierz lokalizację" variant="outlined" />
      )}
    />
  );
};

export default SearchBox;
