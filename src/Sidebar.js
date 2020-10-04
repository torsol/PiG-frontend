import React from "react";
import DropZone from "./DropZone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import LayerBar from "./LayerBar";
import LayersIcon from "@material-ui/icons/Layers";
import FunctionsIcon from "@material-ui/icons/Functions";

import {
  calculateBuffer,
  calculateUnion,
  calculateIntersection,
} from "./utils/APIConnection";

const HeadLine = ({ children }) => {
  return (<div className="headLine">{children}<Divider /></div>)
};

const Sidebar = ({
  addLayersToState,
  removeLayersFromState,
  removeLayerFromState,
  layers,
  selectedLayersIndices,
  removeSelectedLayersIndicesFromState,
}) => {
  var selectedLayers = layers.filter(
    (layer) => selectedLayersIndices.indexOf(layer.id) !== -1
  ); // match selected indices with layers stored in state

  return (
    <div className="sidebar">
      <List disablePadding dense>
        <HeadLine>
          <ListItem>Operations</ListItem>
          <FunctionsIcon />
        </HeadLine>
        <ListItem onClick={calculateBuffer(addLayersToState, selectedLayers)}>
          Buffer
        </ListItem>
        <ListItem onClick={calculateUnion(addLayersToState, selectedLayers)}>
          Union
        </ListItem>
        <ListItem
          onClick={calculateIntersection(addLayersToState, selectedLayers)}
        >
          Intersection
        </ListItem>
        <ListItem onClick={removeLayersFromState}>Remove layers</ListItem>
        <DropZone
          accept="*.json"
          addLayersToState={addLayersToState}
          layers={layers}
        />
        <HeadLine>
          <ListItem>Layers</ListItem>
          <LayersIcon />
        </HeadLine>
        <LayerBar
          layers={layers}
          removeLayersFromState={removeLayersFromState}
          removeLayerFromState={removeLayerFromState}
        />
        <HeadLine>
          <ListItem>Selected Layers</ListItem>
          <LayersIcon />
        </HeadLine>
        <LayerBar
          layers={selectedLayers}
          removeLayerFromState={removeSelectedLayersIndicesFromState}
        />
      </List>
    </div>
  );
};

export default Sidebar;
