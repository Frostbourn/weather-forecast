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

  // console.log(lat);
  return (
    <>
      <div class="grid grid-cols-5 gap-4 grid-flow-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center mt-40 mx-auto">
        <div class="row-span-3 w-64">
          <SearchBox state={handleChange} />
          <CurrentWeather lat={lat} lng={lng} query={query} />
        </div>
        <div class="row-span-3 w-64">Jutro</div>
        <div class="row-span-3 w-64">Pojutrze</div>
        <div class="row-span-3 w-64">Popojutrze</div>
        <div class="row-span-3 w-64">Niedziela</div>
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
