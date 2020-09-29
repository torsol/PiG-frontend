import { ListItem } from "@material-ui/core";
import React from "react";

const LayerBar = ({ layers, removeLayerFromState }) => {

  return (
    <div>
      {layers &&
        layers.map((layer) => {
          return <ListItem key={layer.id} onClick={() => removeLayerFromState(layer.id)}>{layer.name} </ListItem>;
        })}
    </div>
  );
};

export default LayerBar;
