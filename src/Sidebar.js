import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import calculateBuffer from './utils/APIConnection'

const Sidebar = ({addLayerToState}) => {
  console.log(addLayerToState)
  return (
    <div className="sidebar">
      <List disablePadding dense>
      <ListItem onClick={calculateBuffer(addLayerToState)}>Buffer</ListItem>
      </List>
    </div>
  );
}

export default Sidebar;