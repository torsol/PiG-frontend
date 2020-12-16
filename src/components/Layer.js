import { ClearOutlined, CheckOutlined } from "@material-ui/icons";
import { ListItem } from "@material-ui/core";
import React, { useState } from "react";
import InputField from "./InputField";
import {
  DeleteOutline,
  CreateOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@material-ui/icons";

/** 
* This is the component controlling a single state in the layer bar
* @param  layer - The value of the layer in state
* @param  removeLayerFromState - Function that enables the removal of the layer from the layerbar
* @param  handleMetaChange - function that allows name- and visibility change
* @return A layer in the layer bar
*/
const Layer = ({
    layer,
    removeLayerFromState,
    handleMetaChange,
  }) => {

    //Internal state controlling the toggling of input box and layer name
    const [inputBox, setInputBox] = useState(false);
    const [layerName, setLayerName] = useState(layer.name)
  
    const handleNameChange = (event) => {
      if(event.target.value.length < 19) setLayerName(event.target.value)
    }
  
  
    return (
      <div
        key={layer.id}
        className={
          !layer.selected
            ? "layer-item"
            : "layer-item-selected"
        }
      >
          {/* The div uses the selected-value to determine the styling of the layer */}
        {inputBox ? (
          <React.Fragment>
              {/* If name-change has been selected show these components*/}
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
              {/* If not, show these components */}
              {/* If you click the layer, it toggles the selected-property */}
            <ListItem
              disableGutters
              onClick={() => {
                handleMetaChange(layer.id, "selected", !layer.selected);
              }}
            >
              {layer.name}
            </ListItem>
            {/* Toggle the visibility-icon based on visibility */}
            {layer.visibility !== "none" ? (
              <VisibilityOutlined
                onClick={() => handleMetaChange(layer.id, "visibility", "none")}
              />
            ) : (
              <VisibilityOffOutlined
                onClick={() => handleMetaChange(layer.id, "visibility", "visible")}
              ></VisibilityOffOutlined>
            )}
            {/* Select name-change */}
            <CreateOutlined onClick={() => setInputBox(true)} />
            {/* Delete layer using removeLayerFromState */}
            <DeleteOutline onClick={() => removeLayerFromState(layer.id)} />
          </React.Fragment>
        )}
      </div>
    );
  };

export default Layer;