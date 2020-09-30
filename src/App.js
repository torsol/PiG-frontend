import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Map from "./Map";
import { getRandomColor } from "./utils/RandomColor";

const App = (props) => {
  const [layers, setLayers] = useState([]);
  const [selectedLayersIndices, setSelectedLayersIndices] = useState([]);


  const addLayerToState = (layers, setLayers) => {
    return (newValue, operation) => {
      newValue["id"] = operation + "_" + Math.random().toString(36).slice(2); //generates random name for the layer
      newValue["color"] = getRandomColor(); //generates random color
      setLayers([...layers, newValue]);
    };
  };

  const addSelectedLayersIndicesToState = () => {
    return (selected) => {
      setSelectedLayersIndices(selected)
    }
  }

  const removeLayersFromState = (setLayers) => {
    return () => {
      setLayers([]);
    };
  };

  const removeLayerFromState = (setLayers, layers) => {
    return (layerID) => {
      var newLayers = layers.filter(layer => {
        return layer.id !== layerID
      })
      setLayers(newLayers);
    };
  };

  const removeSelectedLayersIndicesFromState = (setSelectedLayersIndices, selectedLayersIndices) => {
    return (layerID) => {
      var newLayers = selectedLayersIndices.filter(layer => {
        return layer !== layerID
      })
      setSelectedLayersIndices(newLayers);
    };
  };

  return (
    <div>
      <Sidebar
        addLayerToState={addLayerToState(layers, setLayers)}
        removeLayersFromState={removeLayersFromState(setLayers)}
        removeLayerFromState={removeLayerFromState(setLayers, layers)}
        layers={layers}
        selectedLayersIndices={selectedLayersIndices}
        removeSelectedLayersIndicesFromState={removeSelectedLayersIndicesFromState(setSelectedLayersIndices, selectedLayersIndices)}
      />
      <Map layers={layers} addSelectedLayersIndicesToState={addSelectedLayersIndicesToState()} />
    </div>
  );
};

export default App;
