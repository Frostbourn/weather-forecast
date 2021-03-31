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
  let date = new Date();
  var days = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  const handleChange = async (data, coords) => {
    if (data) {
      console.log(coords);
      setQuery(data[0].address_components[0].short_name);
      setLat(coords.lat);
      setLng(coords.lng);
      setZoom(9);
    } else {
      setQuery("Warszawa");
      setLat(52);
      setLng(19);
      setZoom(6);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords.latitude + " " + pos.coords.longitude);
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
    console.log(classString);
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
      <div class=" max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center mt-40 mx-auto">
        <div class="bg-white">
          <nav class="tabs flex flex-col sm:flex-row">
            <button
              data-target="panel-1"
              class="tab active text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500"
            >
              Dzisiaj
            </button>
            <button
              data-target="panel-2"
              class="tab ext-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
            >
              Map and Street View
            </button>
            <button
              data-target="panel-3"
              class="tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
            >
              Other info
            </button>
          </nav>
        </div>

        <div id="panels">
          <div class="panel-1 tab-content active py-5">
            <span class="mr-5">
              <i class="fal fa-bed mr-1"></i>
            </span>
            <span>
              <i class="fal fa-bath mr-1"></i>
            </span>
          </div>
          <div class="panel-2 tab-content py-5">Map here</div>
          <div class="panel-3 tab-content py-5">other info</div>
        </div>
        <div class="w-full">
          <SearchBox state={handleChange} />
          <CurrentWeather lat={lat} lng={lng} query={query} />
        </div>
        <div class="w-64">Jutro</div>
        <div class="w-64">{days[date.getDay() + 2]}</div>
        <div class="w-64">{days[date.getDay() + 3]}</div>
        <div class="w-64">{days[date.getDay() + 4]}</div>
        <div class="w-64">{days[date.getDay() + 5]}</div>
        {/* <div class="col-span-2">
          <SearchBox state={handleChange} />
        </div>
        <div class="row-span-2 col-span-2">3</div> */}
      </div>
      {/* <MainContainer>
        <Grid container justify="center">
          <Grid item xs={10} md={8}>
            <Card className="app__content">
              <CardContent>
                <SearchBox state={handleChange} />
                <CurrentWeather lat={lat} lng={lng} query={query} />
                <Map className="content__map" lat={lat} lng={lng} zoom={zoom} />
                 {lat ? <Photo props={this.state} /> : ""}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MainContainer> */}
    </>
  );
};
export default App;
