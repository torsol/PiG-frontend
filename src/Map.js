import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g";

const Map = (props) => {

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

  const addSource = (geojson) => {
    const layerName = "test";

    map.addSource(layerName, {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: layerName,
      type: "fill",
      source: layerName,
      layout: {},
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.8,
      },
    });
  };

  useEffect(() => {
    if (!map) initializeMap({ setMap, mapContainer });
    // eslint-disable-next-line
  }, [map]);

  return (
    <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
  );
};

export default Map;
