import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

// Necessary access-token in order to use the mapbox GL library
mapboxgl.accessToken =
  "pk.eyJ1IjoidG9yc3RlaW4iLCJhIjoiY2s3YWJkdzk3MDU1bjNncnd0dWExN292YiJ9.te0K0gwI11dUd2qZs6FQ0g";

/** 
* The map component contains all logic related to the rendered map in the client
* @param  layers - all layers in state
* @param  addLayersToState - Function that enables the addin of layers to state
* @param  removeLayerFromState - Function that enables the removal of the layer from the layerbar
* @param  handleMetaChange - function that allows name-, selected- and visibility-change
* @return - a scrollable list of layers
*/
const Map = ({
  layers,
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


  // function that is run on initialization, creating the map and connecting necessary map modules
  const initializeMap = (setMap, mapContainer) => {
    const initial_map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/torstein/ckhxghcb708qg19mtz7urlkdx", // stylesheet location"
      center: [lng, lat],
      zoom: zoom,
    });

    // onCreation is triggered when draw polygon is created, adding the polygon to state
    function onCreation(e) {
      var data = draw.getAll();
      addLayersToState([data], "drawTool");
      draw.deleteAll();
    }

    // When map has loaded, add the map to component state, and add onCreation to action handler
    initial_map.on("load", () => {
      setMap(initial_map);
      initial_map.addControl(draw);
      initial_map.on("draw.create", onCreation);
      initial_map.resize();
    });

    // Functionality that handles the clicking on layers on map. 
    initial_map.on("click", (e) => {
      // f is the layers covered by the click position of the event
      let f = initial_map.queryRenderedFeatures(e.point, {
        layers: getCurrentLayerIDs(initial_map),
      });
      if (f.length && draw.getMode() !== "draw_polygon") {
        // if you have clicked a number of layers, select the top layer
        handleMetaChange(f.map((feature) => feature.layer.id)[0], "selected");
      }
    });
  };

  // addLayer adds new layers to the mapbox state by creating a source and layer for each layer in state
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

  // function that removes layer from mapbox-state using the individual layer ids
  const removeLayer = (layers) => {
    layers.forEach((layerID) => {
      map.removeLayer(layerID);
      map.removeSource(layerID);
    });
  };

  // getCurrentLayerIDs retrieves all the local mapbox-layer-ids added by the user, by filtering out the premade layers
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

  // updateVisibility loops through all layers and changes the mapbox-layers that does not match the visibility property in state
  const updateVisibility = (layers) => {
    layers.forEach((layer) => {
      var visibility = map.getLayoutProperty(layer.id, "visibility");
      if (visibility !== layer.visibility)
        map.setLayoutProperty(layer.id, "visibility", layer.visibility);
    });
  };

  // updateSelectedOutline changes the styling of the layer when it is selected/deselected.
  // selected layers will get a black border around them 
  const updateSelectedOutline = (layers) => {
    layers.forEach((layer) => {
      layer.selected
        ? map.setPaintProperty(layer.id, "fill-outline-color", "#000000")
        : map.setPaintProperty(layer.id, "fill-outline-color", layer.color);
    });
  };

  // handleLayerUpdate handles all the changes related to an update in application State
  const handleLayerUpdate = (layers, map) => {

    // get all mapbox-layers
    const currentLayers = getCurrentLayerIDs(map);

    // get the index of mapbox-layers that has been deleted in the application State
    const removable = currentLayers.filter(function (layer) {
      //get the index for layers that have been deleted in the state
      return layers.map((layer) => layer.id).indexOf(layer) === -1;
    });

    //get the index for layers that have been added to the state
    const addable = layers.filter(function (layer) {
      return currentLayers.indexOf(layer.id) === -1;
    });

    // add layers that needs to be in the mapbox-state
    if (addable[0]) addLayer(addable);

    //remove layers that is no longer in application-state
    if (removable[0]) removeLayer(removable);

    updateVisibility(layers);
    updateSelectedOutline(layers);
  };

  // render map on initial load
  useEffect(() => {
    if (!map) initializeMap(setMap, mapContainer);
    // eslint-disable-next-line
  }, [map]);


  // useEffect is a react-hook that triggers on all layers-updates
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
