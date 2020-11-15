import React, { useState, useEffect } from "react";
import DropZone from "./DropZone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LayerBar from "./LayerBar";
import LayersIcon from "@material-ui/icons/Layers";
import FunctionsIcon from "@material-ui/icons/Functions";
import ArrowForward from "@material-ui/icons/ArrowForwardIosOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import InputField from "./components/InputField";
import { ClearOutlined, CheckOutlined } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import {
  calculateSplitGeoJSON,
  getOperationFunction,
  pingApi,
} from "./utils/APIConnection";

export const HeadLine = ({ children }) => {
  return <div className="headLine">{children}</div>;
};

export const Operation = ({ children }) => {
  return <div className="operation">{children}</div>;
};

const Sidebar = ({
  addLayersToState,
  removeLayersFromState,
  removeLayerFromState,
  layers,
  handleMetaChange,
  draw,
}) => {
  var selectedLayers = layers.filter((layer) => layer.selected);

  const [bufferSelected, setBufferSelected] = useState(false);
  const [bufferValue, setBufferValue] = useState(10);
  console.log(draw);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const layerOperation = getOperationFunction(
    enqueueSnackbar,
    addLayersToState
  );

  useEffect(() => {
    pingApi(enqueueSnackbar);
  }, []);

  const handleBufferValueChange = (event) => {
    setBufferValue(event.target.value);
  };

  const onclickBuffer = () => {
    layerOperation(selectedLayers, "buffer", bufferValue)();
    setBufferSelected(false);
  };

  return (
    <div className="sidebar">
      <List disablePadding>
        <HeadLine>
          <ListItem disableGutters>Operations</ListItem>
          <FunctionsIcon />
        </HeadLine>
        <Operation>
          <ListItem
            disableGutters
            onClick={() => {
              console.log(draw);
              draw.changeMode("draw_polygon");
            }}
          >
            Draw Polygon
          </ListItem>
          <ArrowForward />
        </Operation>

        <Operation>
          {!bufferSelected ? (
            <React.Fragment>
              <ListItem disableGutters onClick={() => setBufferSelected(true)}>
                Featurewise Buffer
              </ListItem>
              <ArrowForward />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <InputField
                value={bufferValue}
                handleChange={handleBufferValueChange}
              />
              <ClearOutlined onClick={() => setBufferSelected(false)} />
              <CheckOutlined onClick={onclickBuffer} />
            </React.Fragment>
          )}
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={layerOperation(selectedLayers, "union")}
          >
            N-wise Union
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={layerOperation(selectedLayers, "dissolve")}
          >
            N-wise Dissolve
          </ListItem>
          <ArrowForward />
        </Operation>

        <Operation>
          <ListItem
            disableGutters
            onClick={calculateSplitGeoJSON(addLayersToState, selectedLayers)}
          >
            Featurewise Split
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={layerOperation(selectedLayers, "intersection")}
          >
            Pairwise Intersection
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={layerOperation(selectedLayers, "bbox")}
          >
            Featurewise Bounding Box
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={layerOperation(selectedLayers, "symmetric_difference")}
          >
            Pairwise Symmetric Difference
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem disableGutters onClick={removeLayersFromState}>
            Remove All Layers
          </ListItem>
          <ClearOutlinedIcon />
        </Operation>
        <ListItem disableGutters>
          <DropZone
            accept="*.json"
            addLayersToState={addLayersToState}
            layers={layers}
            enqueueSnackbar={enqueueSnackbar}
          />
        </ListItem>
        <HeadLine>
          <ListItem disableGutters>Layers</ListItem>
          <LayersIcon />
        </HeadLine>
        <LayerBar
          layers={layers}
          removeLayerFromState={removeLayerFromState}
          handleMetaChange={handleMetaChange}
        />
      </List>
    </div>
  );
};

export default Sidebar;
