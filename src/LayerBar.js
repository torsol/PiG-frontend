import { ListItem } from "@material-ui/core";
import React from "react";
import { DeleteOutline } from "@material-ui/icons";

const LayerBar = ({ layers, removeLayerFromState }) => {
  return (
    <div>
      {layers &&
        layers.map((layer) => {
          return (
            <div className="layer-item">
              <ListItem key={layer.id}>{layer.name}</ListItem>
              <DeleteOutline onClick={() => removeLayerFromState(layer.id)} />
            </div>
          );
        })}
    </div>
  );
};

export default LayerBar;
