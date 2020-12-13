import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g";

const Map = ({
  layers,
  handleSelectedChange,
  addLayersToState,
  handleMetaChange,
  draw,
}) => {
  // react hooks for storing the map
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  // initial coordinates for Trondheim
  const lng = 10.38;
  const lat = 63.43;
  const zoom = 13;

  const initializeMap = (setMap, mapContainer) => {
    const initial_map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/torstein/ckhxghcb708qg19mtz7urlkdx", // stylesheet location"
      center: [lng, lat],
      zoom: zoom,
    });
    //initial_map.on("draw.delete", updateArea);
    //initial_map.on("draw.update", updateArea);

    function onCreation(e) {
      var data = draw.getAll();
      addLayersToState([data], "drawTool");
      draw.deleteAll();
      console.log(draw);
    }

    initial_map.on("load", () => {
      setMap(initial_map);
      initial_map.addControl(draw);
      initial_map.on("draw.create", onCreation);

      initial_map.resize();
    });

    initial_map.on("click", (e) => {
      let f = initial_map.queryRenderedFeatures(e.point, {
        layers: getCurrentLayerIDs(initial_map),
      });
      if (f.length && draw.getMode() !== "draw_polygon") {
        // if you have clicked a number of layers
        handleMetaChange(f.map((feature) => feature.layer.id)[0], "selected");
      }
    });
  };

  const addLayer = (layers) => {
    layers.forEach((layer) => {
      map.addSource(layer.id, {
        type: "geojson",
        data: layer,
      });
      map.addLayer({
        id: layer.id,
        type: "fill",
        source: layer.id,
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": layer.color,
          "fill-opacity": 0.7,
          "fill-outline-color": layer.color,
        },
      });
    });
  };

  const removeLayer = (layers) => {
    layers.forEach((layerID) => {
      map.removeLayer(layerID);
      map.removeSource(layerID);
    });
  };

  const getCurrentLayerIDs = (map) => {
    return map
      .getStyle()
      .layers.filter((layer) => {
        return (
          layer.source !== "composite" &&
          layer.type !== "background" &&
          layer.source !== "mapbox-gl-draw-cold" &&
          layer.source !== "mapbox-gl-draw-hot"
        );
      })
      .map((layer) => layer.id);
  };

  const updateVisibility = (layers) => {
    layers.forEach((layer) => {
      var visibility = map.getLayoutProperty(layer.id, "visibility");
      if (visibility !== layer.visibility)
        map.setLayoutProperty(layer.id, "visibility", layer.visibility);
    });
  };

  const updateSelectedOutline = (layers) => {
    layers.forEach((layer) => {
      layer.selected
        ? map.setPaintProperty(layer.id, "fill-outline-color", "#000000")
        : map.setPaintProperty(layer.id, "fill-outline-color", layer.color);
    });
  };

  const handleLayerUpdate = (layers, map) => {
    const currentLayers = getCurrentLayerIDs(map);

    const removable = currentLayers.filter(function (layer) {
      //get the index for layers that have been deleted in the state
      return layers.map((layer) => layer.id).indexOf(layer) === -1;
    });

    const addable = layers.filter(function (layer) {
      //get the index for layers that have been added to the state
      return currentLayers.indexOf(layer.id) === -1;
    });

    if (addable[0]) addLayer(addable);
    if (removable[0]) removeLayer(removable);

    updateVisibility(layers);
    updateSelectedOutline(layers);
  };

  // render map on initial load
  useEffect(() => {
    if (!map) initializeMap(setMap, mapContainer);
    // eslint-disable-next-line
  }, [map]);

  useEffect(() => {
    if (map) handleLayerUpdate(layers, map);
    console.log("Map", "Layers handled");
    // eslint-disable-next-line
  }, [layers]);

  return (
    <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
  );
};

export default Map;