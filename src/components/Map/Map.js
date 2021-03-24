import React from "react";
import { MapContainer, useMap, TileLayer } from "react-leaflet";

function SetViewOnClick({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);

  return null;
}

const Map = ({ props }) => {
  return (
    <div className="content__map">
      <MapContainer center={[props.lat, props.lng]}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZnJvc3Rib3VybiIsImEiOiJja2x0eGN0aHowdTNvMnZwMzViaW5vcG5rIn0.8A0y1UIJvQRAJfm-UGQ0Mg"
          attribution='&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <SetViewOnClick coords={[props.lat, props.lng]} zoom={props.zoom} />
      </MapContainer>
    </div>
  );
};

export default Map;
