import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Spinner from "../Spinner/Spinner.js";

const Headline = styled.h3`
  font-weight: bold;
`;
const ImageLink = styled.a`
  text-decoration: none;
`;
const SatelliteImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Photo = ({ props }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/earth/assets?lon=${props.lng}&lat=${props.lat}&date=2020-07-01&dim=0.5&api_key=TdVueCcN5AyTbxNgrEEU6bU9CXQwW5SMhoRLwppq`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [props.lat, props.lng]);

  return data.url ? (
    <>
      <Headline>NASA satellite view of the selected location</Headline>
      <ImageLink href={data.url} target="_blank">
        <SatelliteImage src={data.url} width="500" alt="Satellite" />
      </ImageLink>
    </>
  ) : (
    <Spinner />
  );
};

export default Photo;
