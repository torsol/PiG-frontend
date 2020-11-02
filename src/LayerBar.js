import { ClearOutlined, CheckOutlined } from "@material-ui/icons";
import { ListItem } from "@material-ui/core";
import React, { useState } from "react";
import {
  DeleteOutline,
  CreateOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@material-ui/icons";

const InputField = ({value, handleChange}) => {
  return <input type="text" value={value} onChange={handleChange}></input>;
};

const Layer = ({
  layer,
  removeLayerFromState,
  selectedLayersIndices,
  handleSelectedChange,
  handleMetaChange,
}) => {
  const [inputBox, setInputBox] = useState(false);
  const [layerName, setLayerName] = useState(layer.name)

  const handleNameChange = (event) => {
    setLayerName(event.target.value)
  }


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
            <InputField value={layerName} handleChange={handleNameChange}/>
          </ListItem>
          <ClearOutlined
            onClick={() => {
              setLayerName(layer.name)
              setInputBox(false);
            }}
          />
          <CheckOutlined
            onClick={() => {
              setInputBox(false);
              handleMetaChange(layer.id, "name", layerName)}
            }
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
              onClick={() => handleMetaChange(layer.id, "visibility", "none")}
            />
          ) : (
            <VisibilityOffOutlined
              onClick={() => handleMetaChange(layer.id, "visibility", "visible")}
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
