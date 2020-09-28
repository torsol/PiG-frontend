import React, { useEffect } from "react";
import DropZone from "./DropZone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import calculateBuffer from "./utils/APIConnection";

const Layer = ({ name, type }) => {
  return <ListItem>name + " " + type</ListItem>;
};

const LayerBar = ({ layers }) => {
  let itemsToRender;
  useEffect(() => {
    console.log("changes detected");
    if (layers) {
      itemsToRender = layers.map((layer) => {
        return <div key={layer.name}>{layer.name}</div>;
      });
      console.log("layers in layerBar", layers, itemsToRender);
    }
  }, [layers]);

  return (
    <div>
      {layers &&
        layers.map((layer) => {
          return <div key={layer.name}>{layer.name}</div>;
        })}
    </div>
  );
};

export default LayerBar;
