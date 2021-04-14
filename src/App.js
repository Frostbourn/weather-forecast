import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SearchBox from "./components/SearchBox/SearchBox.js";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.js";

import Map from "./components/Map/Map.js";
// import Photo from "./components/Photo/Photo.js";
import { Grid, Card, CardContent } from "@material-ui/core";

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
  const [zoom, setZoom] = useState(6);

  const getDays = (dateObj, numDays) => {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj.toLocaleString("default", { weekday: "long" });
  };

  const thirdDay = getDays(new Date(), 2);
  const fourthDay = getDays(new Date(), 3);
  const fifthDay = getDays(new Date(), 4);
  const sixthDay = getDays(new Date(), 5);
  const seventhDay = getDays(new Date(), 6);

  const handleChange = async (data, coords) => {
    if (data) {
      //console.log(coords);
      setQuery(data[0].address_components[0].short_name);
      setLat(coords.lat);
      setLng(coords.lng);
      setZoom(9);
    }
    // else {
    //   setQuery("Warszawa");
    //   setLat(52);
    //   setLng(19);
    //   setZoom(6);
    // }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        //(pos.coords.latitude + " " + pos.coords.longitude);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLat(lat);
        setLng(lng);
        setZoom(9);
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
  const tabs = document.querySelectorAll(".tabs");
  const tab = document.querySelectorAll(".tab");
  const panel = document.querySelectorAll(".tab-content");

  function onTabClick(event) {
    // deactivate existing active tabs and panel

    for (let i = 0; i < tab.length; i++) {
      tab[i].classList.remove("active");
    }

    for (let i = 0; i < panel.length; i++) {
      panel[i].classList.remove("active");
    }

    // activate new tabs and panel
    event.target.classList.add("active");
    let classString = event.target.getAttribute("data-target");
    //console.log(classString);
    document
      .getElementById("panels")
      .getElementsByClassName(classString)[0]
      .classList.add("active");
  }

  for (let i = 0; i < tab.length; i++) {
    tab[i].addEventListener("click", onTabClick, false);
  }
  // console.log(lat);
  return (
    <>
      <div className="max-w-screen-xl bg-white px-8 py-6 rounded-xl space-y-5 items-center mt-20 mx-auto">
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
