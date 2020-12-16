import React, { useState } from "react";
import { SnackbarProvider } from "notistack";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import { getRandomColor, getRandomString } from "./utils/Randomizer";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Tutorial from "./components/Tutorial";


/*
* The main component of the application, containing the state and other components. 
*/
const App = () => {

  // The layers added to the application
  const [layers, setLayers] = useState([]);


  // the mapbox-draw component
  const [draw, setDraw] = useState(
    new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        point: false,
        line_string: false,
        polygon: false,
      },
    })
  );

  // addLayersToState creates new layers in the state by adding id, name and color to the added geojson
  const addLayersToState = (setLayers) => {
    return (newValues, operation) => {
      newValues.forEach((newValue) => {
        newValue["id"] = operation + "_" + getRandomString(5); //generates random id for the layer
        newValue["name"] =
          operation + "_" + getRandomString(5);
        newValue["color"] = getRandomColor(); //generates random color
      });
      newValues = newValues.filter(value => value["features"].length) //add layers that actually has features
      setLayers((layers) => [...layers, ...newValues]);
    };
  };

  // handelMetaChange takes in key-value pairs of metadata that needs to be changes in a lyers. 
  const handleMetaChange = (setLayers) => {
    return (layerId, key, change) => {
      !change && key === "selected"
        ? setLayers((prevLayers) =>
            prevLayers.map((layer) =>
              layer.id === layerId
                ? { ...layer, [key]: !layer.selected }
                : layer
            )
          )
        : setLayers((prevLayers) =>
            prevLayers.map((layer) =>
              layer.id === layerId ? { ...layer, [key]: change } : layer
            )
          );
    };
  };

  // empty the state from all layers
  const removeLayersFromState = (setLayers) => {
    return () => {
      setLayers([]);
    };
  };

  // remove the layer from state that matches a given id
  const removeLayerFromState = (setLayers, layers) => {
    return (layerID) => {
      var newLayers = layers.filter((layer) => {
        return layer.id !== layerID;
      });
      setLayers(newLayers);
    };
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div>
        <Sidebar
          addLayersToState={addLayersToState(setLayers)}
          removeLayersFromState={removeLayersFromState(setLayers)}
          removeLayerFromState={removeLayerFromState(setLayers, layers)}
          layers={layers}
          handleMetaChange={handleMetaChange(setLayers)}
          setDraw={setDraw}
        />
        <Map
          layers={layers}
          addLayersToState={addLayersToState(setLayers)}
          handleMetaChange={handleMetaChange(setLayers)}
          draw={draw}
        />
        <Tutorial />
      </div>
    </SnackbarProvider>
  );
};

export default App;