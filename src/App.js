import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SearchBox from "./components/SearchBox/SearchBox.js";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.js";

import Map from "./components/Map/Map.js";
// import Photo from "./components/Photo/Photo.js";

import "./styles.css";
import "leaflet/dist/leaflet.css";

const MainContainer = styled.section`
  padding: 8vw 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [query, setQuery] = useState("Warszawa");
  const [lat, setLat] = useState(52);
  const [lng, setLng] = useState(19);

  const getDays = (dateObj, numDays) => {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj.toLocaleString("default", { weekday: "long" });
  };

  const handleChange = async (data, coords) => {
    if (data) {
      setQuery(data[0].address_components[0].short_name);
      setLat(coords.lat);
      setLng(coords.lng);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        //(pos.coords.latitude + " " + pos.coords.longitude);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLat(lat);
        setLng(lng);
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBsWdIdGnDcWj3iXvL6X761wP7I_TwUWGk&latlng=${lat},${lng}&language=pl`
        )
          .then((response) => response.json())
          .then((data) => {
            setQuery(data.results[0].address_components[2].long_name);
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <>
      <div className="w-3/4 bg-white px-8 py-6 rounded-xl space-y-5 items-center mt-20 mx-auto">
        <div className="bg-white">
          <div className="w-full">
            <SearchBox state={handleChange} />

            <CurrentWeather lat={lat} lng={lng} query={query} />
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
