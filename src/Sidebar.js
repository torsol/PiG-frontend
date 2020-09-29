import React from "react";
import DropZone from "./DropZone"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider"
import LayerBar from "./LayerBar"

import calculateBuffer from './utils/APIConnection'

const Sidebar = ({addLayerToState, removeLayersFromState, removeLayerFromState, layers}) => {
  return (
    <div className="sidebar">
      <List disablePadding dense>
      <ListItem onClick={calculateBuffer(addLayerToState)}>Buffer</ListItem>
      <ListItem onClick={removeLayersFromState}>Remove layers</ListItem>
      <Divider />
      <ListItem><DropZone accept ="*.json" addLayerToState={addLayerToState}/></ListItem>
      <Divider />
      <LayerBar layers={layers} removeLayersFromState={removeLayersFromState} removeLayerFromState={removeLayerFromState}/>
      </List>
    </div>
  );
}

export default Sidebar;