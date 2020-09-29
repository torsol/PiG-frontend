import React, {useEffect} from "react";
import DropZone from "./DropZone"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider"
import LayerBar from "./LayerBar"

import calculateBuffer from './utils/APIConnection'

const Sidebar = ({addLayerToState, removeLayersFromState, removeLayerFromState, layers, selectedLayers}) => {

  var inputData = layers.filter((layer) => selectedLayers.indexOf(layer.id) !== -1)
  console.log(inputData)

  return (
    <div className="sidebar">
      <List disablePadding dense>
      <ListItem onClick={calculateBuffer(addLayerToState, inputData)}>Buffer</ListItem>
      <ListItem onClick={removeLayersFromState}>Remove layers</ListItem>
      <Divider />
      <ListItem><DropZone accept ="*.json" addLayerToState={addLayerToState}/></ListItem>
      <Divider />
      <LayerBar layers={layers} removeLayersFromState={removeLayersFromState} removeLayerFromState={removeLayerFromState}/>
      <Divider />
      <LayerBar layers={inputData}/>
      </List>
    </div>
  );
}

export default Sidebar;