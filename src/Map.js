import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import {getRandomColor} from "./utils/RandomColor"

mapboxgl.accessToken =
  "pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g";

const Map = ({ layers }) => {
  // react hooks for storing the map
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  // initial coordinates for Trondheim
  const lng = 10.38;
  const lat = 63.43;
  const zoom = 13;

  const initializeMap = ({ setMap, mapContainer }) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("load", () => {
      setMap(map);
      map.resize();
    });
  };

  const addLayer = (layer) => {
    map.addSource(layer.name, {
      type: "geojson",
      data: layer,
    });
    map.addLayer({
      id: layer.name,
      type: "fill",
      source: layer.name,
      layout: {},
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.8,
      },
    });
  };

  // render map on initial load
  useEffect(() => {
    if (!map) initializeMap({ setMap, mapContainer });
    // eslint-disable-next-line
  }, [map]);

  // render map on initial load
  useEffect(() => {
    console.log("Map", "Layers handled");
    if (map) addLayer(layers.slice(-1)[0]); //add the last added layer to the list
    // eslint-disable-next-line
  }, [layers]);

  return (
    <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
  );
};

export default Map;
