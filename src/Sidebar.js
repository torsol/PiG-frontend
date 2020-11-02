import React from "react";
import DropZone from "./DropZone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LayerBar from "./LayerBar";
import LayersIcon from "@material-ui/icons/Layers";
import FunctionsIcon from "@material-ui/icons/Functions";
import ArrowForward from "@material-ui/icons/ArrowForwardIosOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

import {
  calculateBuffer,
  calculateUnion,
  calculateIntersection,
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

  var selectedLayers = layers.filter(
    (layer) => layer.selected
  );
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
            onClick={calculateBuffer(addLayersToState, selectedLayers)}
          >
            Buffer
          </ListItem>
          <ArrowForward />
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
          <ListItem disableGutters onClick={removeLayersFromState}>
            Remove layers
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
