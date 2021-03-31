import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const SearchBox = ({ state, coords }) => {
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [placeholder, setPlaceholder] = useState("Wybierz lokalizację");
  const handleLocationSelect = async (value, event) => {
    if (value) {
      setLocation(value);
      const results = await geocodeByAddress(value.label);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
      state(results, latLng);
    }
  };

  // useEffect(() => {
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiZnJvc3Rib3VybiIsImEiOiJja2x0aTl4OWQwOHluMndvMzA1bXBicDBiIn0.8GtwA1s3m5hqxxgRpaaU4Q`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     });
  // }, [query]);

  // const handleInputChange = (event, value) => {
  //   value ? setQuery(value) : ""; /* eslint-disable-line */
  // };

  // const handleChange = (event, value) => {
  //   state(value);
  //   console.log(value);
  // };

  return (
    <>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBsWdIdGnDcWj3iXvL6X761wP7I_TwUWGk"
        apiOptions={{ language: "pl", region: "pl" }}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["pl"],
          },
          types: ["(cities)"],
        }}
        debounce={500}
        onLoadFailed={(error) =>
          console.error("Could not inject Google script", error)
        }
        selectProps={{
          value: location,
          placeholder: placeholder,
          onChange: handleLocationSelect,
          onFocus: () => {
            console.log("focus");
            setLocation(null);
          },
          onMenuOpen: () => {
            console.log("onMenuOpen");
            setLocation(null);
          },
          isClearable: true,
        }}
      />
      {/* <Autocomplete
        style={{ width: 300 }}
        options={data.features}
        autoHighlight
        getOptionLabel={(option) => (option.text ? option.text : "")}
        getOptionSelected={(option, value) => option.text === value.text}
        onInputChange={handleInputChange}
        onChange={handleChange}
        renderOption={(option) => <>{option.text}</>}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Wybierz lokalizację"
            variant="outlined"
          />
        )}
      /> */}
    </>
  );
};

export default SearchBox;
