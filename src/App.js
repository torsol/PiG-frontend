import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Map from "./Map";
import { getRandomColor } from "./utils/RandomColor";

const App = (props) => {
  const [layers, setLayers] = useState([]);
  const [selectedLayersIndices, setSelectedLayersIndices] = useState([]);
  const selectedLayersRef = useRef(selectedLayersIndices);

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

  const handleSelectedChange = () => {
    return (selected) => {
      console.log(selected);
      if (selectedLayersRef.current.indexOf(selected) === -1) {
        selectedLayersRef.current = [...selectedLayersRef.current, selected];
        console.log(selectedLayersRef.current);
        setSelectedLayersIndices(selectedLayersRef.current); // if not selected, add to state
      } else {
        selectedLayersRef.current = selectedLayersRef.current.filter(
          (indice) => {
            // if selected, filter out of state
            return indice !== selected;
          }
        );
        setSelectedLayersIndices(selectedLayersRef.current);
      }
    };
  };

  const removeLayersFromState = (setLayers) => {
    return () => {
      setSelectedLayersIndices([]);
      setLayers([]);
      selectedLayersRef.current = [];
    };
  };

  const removeLayerFromState = (setLayers, layers) => {
    return (layerID) => {
      var newLayers = layers.filter((layer) => {
        return layer.id !== layerID;
      });
      var newSelectedIndices = selectedLayersRef.current.filter((layer) => {
        return layer !== layerID;
      });
      setSelectedLayersIndices(newSelectedIndices);
      selectedLayersRef.current = newSelectedIndices;
      setLayers(newLayers);
    };
  };

  const removeSelectedLayersIndicesFromState = (
    setSelectedLayersIndices,
    selectedLayersIndices
  ) => {
    return (layerID) => {
      var newLayers = selectedLayersIndices.filter((layer) => {
        return layer !== layerID;
      });
      selectedLayersRef.current = newLayers;
      setSelectedLayersIndices(newLayers);
    };
  };

  return (
    <div>
      <Sidebar
        addLayersToState={addLayersToState(setLayers)}
        removeLayersFromState={removeLayersFromState(setLayers)}
        removeLayerFromState={removeLayerFromState(setLayers, layers)}
        layers={layers}
        selectedLayersIndices={selectedLayersIndices}
        removeSelectedLayersIndicesFromState={removeSelectedLayersIndicesFromState(
          setSelectedLayersIndices,
          selectedLayersIndices
        )}
      />
      <Map
        layers={layers}
        handleSelectedChange={handleSelectedChange()}
        addLayersToState={addLayersToState(setLayers)}
      />
    </div>
  );
};

export default App;
