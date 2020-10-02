import React from "react";
import DropZone from "./DropZone"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider"
import LayerBar from "./LayerBar"

import {calculateBuffer, calculateUnion, calculateIntersection} from './utils/APIConnection'

const Sidebar = ({addLayersToState, removeLayersFromState, removeLayerFromState, layers, selectedLayersIndices, removeSelectedLayersIndicesFromState}) => {

  var selectedLayers = layers.filter((layer) => selectedLayersIndices.indexOf(layer.id) !== -1) // match selected indices with layers stored in state

  return (
    <div className="sidebar">
      <List disablePadding dense>
      <ListItem>Operations</ListItem>
      <Divider />
      <ListItem onClick={calculateBuffer(addLayersToState, selectedLayers)}>Buffer</ListItem>
      <ListItem onClick={calculateUnion(addLayersToState, selectedLayers)}>Union</ListItem>
      <ListItem onClick={calculateIntersection(addLayersToState, selectedLayers)}>Intersection</ListItem>
      <ListItem onClick={removeLayersFromState}>Remove layers</ListItem>
      <Divider />
      <ListItem><DropZone accept ="*.json" addLayersToState={addLayersToState} layers={layers}/></ListItem>
      <Divider />
      <ListItem>Layers</ListItem>
      <Divider />
      <LayerBar layers={layers} removeLayersFromState={removeLayersFromState} removeLayerFromState={removeLayerFromState}/>
      <Divider />
      <ListItem>Selected layers</ListItem>
      <Divider />
      <LayerBar layers={selectedLayers} removeLayerFromState={removeSelectedLayersIndicesFromState}/>
      </List>
    </div>
  );
}

export default Sidebar;