import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

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
    map.addSource(layer.id, {
      type: "geojson",
      data: layer,
    });
    map.addLayer({
      id: layer.id,
      type: "fill",
      source: layer.id,
      layout: {},
      paint: {
        "fill-color": layer.color,
        "fill-opacity": 0.5,
      },
    });

    map.on('click', layer.id, (e) => {
      console.log(layer.id, "clicked")
    })

    delete layer['features'] // dont need the features already added to layer
  };

  const removeLayer = (layers) => {
    layers.forEach(layerID => {
      map.removeLayer(layerID);
      map.removeSource(layerID);
    } )
  };

  const getCurrentLayerIDs = () => {
    return map.getStyle().layers.filter((layer) => {
      return layer.source !== "composite" && layer.type !== "background";
    }).map(layer => layer.id)
  };

  const handleLayerUpdate = (layers) => {

    const currentLayers = getCurrentLayerIDs()

    const removable=currentLayers.filter(function(layer){        //get the index for layers that have been deleted in the state
      return layers.map(layer => layer.id).indexOf(layer)===-1;
    })

    const addable=layers.filter(function(layer){                 //get the index for layers that have been added to the state
      return currentLayers.indexOf(layer.id)===-1;
    })

    if (addable[0]) addLayer(addable[0])
    if (removable[0]) removeLayer(removable)

  }

  // render map on initial load
  useEffect(() => {
    if (!map) initializeMap({ setMap, mapContainer });
    // eslint-disable-next-line
  }, [map]);

  // render map on initial load
  useEffect(() => {
    console.log("Map", "Layers handled");
    if (map) handleLayerUpdate(layers);
    // eslint-disable-next-line
  }, [layers]);

  return (
    <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
  );
};

export default Map;
