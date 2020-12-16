import React, { useEffect } from "react";
import DropZone from "./DropZone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LayerBar from "./LayerBar";
import LayersIcon from "@material-ui/icons/Layers";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { useSnackbar } from "notistack";
import {
  calculateSplitGeoJSON,
  getOperationFunction,
  pingApi,
} from "../utils/APIConnection";
import Operation from "./Operation"

var operationTexts = require('../data/operations.json');

// Simple component for the headlines in the sidebar
export const HeadLine = ({ children }) => {
  return <div className="headLine">{children}</div>;
};

/** 
* The sidebar component contains the operations, dropzone and layerbar
* @param  addLayersToState - function that enables adding of layers to application state
* @param  removeLayersFromState - function that enables removal of layers from application state
* @param  layers - all the layers in application state
* @param  handleMetaChange - function that allows name-, selected- and visibility-change
* @param  setDraw - function that enables us to set the current state of the mapbox-draw functionality
* @param  popoverText - The text that is shown when clicking the help-icon of the operation
* @return - Returns the sidebar
*/
const Sidebar = ({
  addLayersToState,
  removeLayersFromState,
  removeLayerFromState,
  layers,
  handleMetaChange,
  setDraw,
}) => {

  // compile the list of selected layers from state
  var selectedLayers = layers.filter((layer) => layer.selected);

  // enable the snackbar for notifications
  const { enqueueSnackbar } = useSnackbar();

  // enable the layerOperation with snackbar and addlayerstostate-functionality
  const layerOperation = getOperationFunction(
    enqueueSnackbar,
    addLayersToState
  );
  
  // create onClick functionality 
  const onClickBuffer = () => {
    return (value) => {
      layerOperation(selectedLayers, "buffer", value)();
    };
  };

  // ping the api on load in order to wake the API up. 
  useEffect(() => {
    pingApi(enqueueSnackbar);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sidebar">
      <List disablePadding>
        <HeadLine>
          <ListItem disableGutters>Control Panel</ListItem>
        </HeadLine>
        <Operation
          onClick={() => {
            setDraw((draw) => draw.changeMode("draw_polygon"));
          }}
          name="Draw Polygon"
          enabled={true}
          popoverText={operationTexts.draw_polygon}
        />
        <Operation
          name="Buffer"
          onClick={onClickBuffer()}
          selectable={true}
          enabled={selectedLayers.length >= 1}
          popoverText={operationTexts.buffer}
        />
        <Operation
          name="Union"
          onClick={layerOperation(selectedLayers, "union")}
          enabled={selectedLayers.length >= 2}
          popoverText={operationTexts.union}
        />
        <Operation
          name="Dissolve"
          onClick={layerOperation(selectedLayers, "dissolve")}
          enabled={selectedLayers.length === 1}
          popoverText={operationTexts.dissolve}
        ></Operation>

        <Operation
          onClick={calculateSplitGeoJSON(addLayersToState, selectedLayers)}
          name="Split"
          enabled={selectedLayers.length >= 1}
          popoverText={operationTexts.split}
        />
        <Operation
          onClick={layerOperation(selectedLayers, "intersection")}
          name="Intersection"
          enabled={selectedLayers.length === 2}
          popoverText={operationTexts.intersection}
        />
        <Operation
          onClick={layerOperation(selectedLayers, "bbox")}
          name="Bounding Box"
          enabled={selectedLayers.length >= 1}
          popoverText={operationTexts.bbox}
        />
        <Operation
          onClick={layerOperation(selectedLayers, "symmetric_difference")}
          name="Symmetric Difference"
          enabled={selectedLayers.length === 2}
          popoverText={operationTexts.symmetric_difference}
        />
        <Operation
          onClick={removeLayersFromState}
          name="Remove All Layers"
          icon={<ClearOutlinedIcon />}
          enabled={layers.length > 0}
        />
        <ListItem disableGutters>
          <DropZone
            accept="*.json"
            addLayersToState={addLayersToState}
            layers={layers}
            enqueueSnackbar={enqueueSnackbar}
          />
        </ListItem>
        <HeadLine>
          <ListItem disableGutters>Layers</ListItem>
          <LayersIcon />
        </HeadLine>
        <LayerBar
          layers={layers}
          removeLayerFromState={removeLayerFromState}
          handleMetaChange={handleMetaChange}
        />
      </List>
    </div>
  );
};

export default Sidebar;
