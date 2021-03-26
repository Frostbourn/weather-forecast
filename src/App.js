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
  const [lat, setLat] = useState(52.229676);
  const [lng, setLng] = useState(21.012229);
  const [zoom, setZoom] = useState(1);

  const handleChange = async (data) => {
    if (data) {
      setQuery(data.text);
      setLat(data.center[1]);
      setLng(data.center[0]);
      setZoom(9);
    } else {
      setQuery("Kraków");
      setLat(52.229676);
      setLng(21.012229);
      setZoom(1);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords.latitude + " " + pos.coords.longitude); // display VALUE
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLat(lat);
        setLng(lng);
        setZoom(9);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // console.log(lat);
  return (
    <MainContainer>
      <Grid container justify="center">
        <Grid item xs={10} md={8}>
          <Card className="app__content">
            <CardContent>
              <SearchBox state={handleChange} />
              <CurrentWeather lat={lat} lng={lng} query={query} />
              <Map className="content__map" lat={lat} lng={lng} zoom={zoom} />
              {/* {lat ? <Photo props={this.state} /> : ""} */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
export default App;
