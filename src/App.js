import React, { useState } from "react";
import { SnackbarProvider } from "notistack";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import { getRandomColor, getRandomString } from "./utils/Randomizer";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Tutorial from "./components/Tutorial";

const App = (props) => {
  const [layers, setLayers] = useState([]);

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





