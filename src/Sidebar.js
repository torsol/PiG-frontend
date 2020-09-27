import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import calculateBuffer from './utils/APIConnection'

const Sidebar = ({setLayers}) => {
  return (
    <div className="sidebar">
      <List disablePadding dense>
      <ListItem onClick={(calculateBuffer(setLayers))}>Buffer</ListItem>
      </List>
    </div>
  );
}

export default Sidebar;