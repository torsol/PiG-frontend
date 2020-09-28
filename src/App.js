import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Map from "./Map";
import { getRandomColor } from "./utils/RandomColor";

const App = (props) => {
  const [layers, setLayers] = useState([]);

  const addLayerToState = (layers, setLayers) => {
    return (newValue, operation) => {
      newValue["id"] = operation + "_" + Math.random().toString(36).slice(2); //generates random name for the layer
      newValue["color"] = getRandomColor(); //generates random color
      setLayers([...layers, newValue]);
    };
  };

  const removeLayersFromState = (setLayers) => {
    return () => {
      setLayers([]);
    };
  };

  useEffect(() => {
    console.log("App", "State updated");
  }, [layers]);

  return (
    <div>
      <Sidebar
        addLayerToState={addLayerToState(layers, setLayers)}
        removeLayersFromState={removeLayersFromState(setLayers)}
        layers={layers}
      />
      <Map layers={layers} />
    </div>
  );
};

export default App;
