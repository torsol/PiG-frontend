import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Map from "./Map";
import { getRandomColor } from "./utils/RandomColor";

const App = (props) => {
  const [layers, setLayers] = useState([]);

  const addLayersToState = (setLayers) => {
    return (newValues, operation) => {
      newValues.forEach((newValue) => {
        newValue["id"] = operation + "_" + Math.random().toString(36).slice(2); //generates random name for the layer
        newValue["name"] =
          operation + "_" + Math.random().toString(36).slice(2);
        newValue["color"] = getRandomColor(); //generates random color
      });
      setLayers((layers) => [...layers, ...newValues]);
    };
  };

  const handleMetaChange = (setLayers) => {
    return (layerId, key, change) => {
      console.log(layerId, key, change);
      !change && key == "selected"
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

  const removeLayersFromState = (setLayers) => {
    return () => {
      setLayers([]);
    };
  };

  const removeLayerFromState = (setLayers, layers) => {
    return (layerID) => {
      var newLayers = layers.filter((layer) => {
        return layer.id !== layerID;
      });
      setLayers(newLayers);
    };
  };

  return (
    <div>
      <Sidebar
        addLayersToState={addLayersToState(setLayers)}
        removeLayersFromState={removeLayersFromState(setLayers)}
        removeLayerFromState={removeLayerFromState(setLayers, layers)}
        layers={layers}
        handleMetaChange={handleMetaChange(setLayers)}
      />
      <Map
        layers={layers}
        addLayersToState={addLayersToState(setLayers)}
        handleMetaChange={handleMetaChange(setLayers)}
      />
    </div>
  );
};

export default App;
