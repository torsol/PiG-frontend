import React, { useState } from "react";
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
import {
  calculateBuffer,
  calculateUnion,
  calculateIntersection,
  calculateSymmetricDifference,
  calculateBoundingBox, 
  calculateDissolve
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
}) => {
  var selectedLayers = layers.filter((layer) => layer.selected);

  const [bufferSelected, setBufferSelected] = useState(false);
  const [bufferValue, setBufferValue] = useState(10);

  const handleBufferValueChange = (event) => {
    setBufferValue(event.target.value);
  };

  const onclickBuffer = () => {
    calculateBuffer(addLayersToState, selectedLayers, bufferValue)();
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
          {!bufferSelected ? (
            <React.Fragment>
              <ListItem disableGutters onClick={() => setBufferSelected(true)}>
                Buffer
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
            onClick={calculateUnion(addLayersToState, selectedLayers)}
          >
            Union
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={calculateIntersection(addLayersToState, selectedLayers)}
          >
            Intersection
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={calculateDissolve(addLayersToState, selectedLayers)}
          >
            Dissolve
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={calculateBoundingBox(addLayersToState, selectedLayers)}
          >
            Bounding Box
          </ListItem>
          <ArrowForward />
        </Operation>
        <Operation>
          <ListItem
            disableGutters
            onClick={calculateSymmetricDifference(addLayersToState, selectedLayers)}
          >
            Symmetric Difference
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
