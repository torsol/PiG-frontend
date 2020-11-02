import { ClearOutlined, CheckOutlined } from "@material-ui/icons";
import { ListItem } from "@material-ui/core";
import React, { useState } from "react";
import {
  DeleteOutline,
  CreateOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@material-ui/icons";

const InputField = () => {
  return <input type="text"></input>;
};

const Layer = ({
  layer,
  removeLayerFromState,
  selectedLayersIndices,
  handleSelectedChange,
  handleMetaChange,
}) => {
  const [inputBox, setInputBox] = useState(false);

  return (
    <div
      key={layer.id}
      className={
        selectedLayersIndices.indexOf(layer.id) === -1
          ? "layer-item"
          : "layer-item-selected"
      }
    >
      {inputBox ? (
        <React.Fragment>
          <ListItem disableGutters>
            <InputField />
          </ListItem>
          <ClearOutlined
            onClick={() => {
              setInputBox(false);
            }}
          />
          <CheckOutlined
            onClick={() => {
              setInputBox(false);
            }}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ListItem
            disableGutters
            onClick={() => {
              handleSelectedChange(layer.id);
            }}
          >
            {layer.name}
          </ListItem>
          {layer.visibility !== "none" ? (
            <VisibilityOutlined
              onClick={() => handleMetaChange(layer.id, "none")}
            />
          ) : (
            <VisibilityOffOutlined
              onClick={() => handleMetaChange(layer.id, "visible")}
            ></VisibilityOffOutlined>
          )}
          <CreateOutlined onClick={() => setInputBox(true)} />
          <DeleteOutline onClick={() => removeLayerFromState(layer.id)} />
        </React.Fragment>
      )}
    </div>
  );
};

const LayerBar = ({
  layers,
  removeLayerFromState,
  selectedLayersIndices,
  handleSelectedChange,
  handleMetaChange,
}) => {
  return (
    <div>
      {layers &&
        layers.map((layer) => {
          return (
            <Layer
              key={layer.id}
              layer={layer}
              removeLayerFromState={removeLayerFromState}
              selectedLayersIndices={selectedLayersIndices}
              handleSelectedChange={handleSelectedChange}
              handleMetaChange={handleMetaChange}
            />
          );
        })}
    </div>
  );
};

export default LayerBar;
