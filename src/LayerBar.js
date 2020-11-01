import { ListItem } from "@material-ui/core";
import React from "react";
import { DeleteOutline, CreateOutlined, VisibilityOutlined } from "@material-ui/icons";

const LayerBar = ({
  layers,
  removeLayerFromState,
  selectedLayersIndices,
  handleSelectedChange,
  handleMetaChange
}) => {
  console.log(selectedLayersIndices);
  return (
    <div>
      {layers &&
        layers.map((layer) => {
          return (
            <div
              key={layer.id}
              className={
                selectedLayersIndices.indexOf(layer.id) === -1
                  ? "layer-item"
                  : "layer-item-selected"
              }
            >
              <ListItem disableGutters
                onClick={() => {
                  handleSelectedChange(layer.id);
                }}
              >
                {layer.name}
              </ListItem>
              <VisibilityOutlined onClick={() => handleMetaChange(layer.id, 'none')}/>
              <CreateOutlined />
              <DeleteOutline onClick={() => removeLayerFromState(layer.id)} />
            </div>
          );
        })}
    </div>
  );
};

export default LayerBar;
