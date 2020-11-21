import React, { useEffect } from "react";
import DropZone from "./DropZone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LayerBar from "./LayerBar";
import LayersIcon from "@material-ui/icons/Layers";
import FunctionsIcon from "@material-ui/icons/Functions";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { useSnackbar } from "notistack";
import {
  calculateSplitGeoJSON,
  getOperationFunction,
  pingApi,
} from "./utils/APIConnection";

import Operation from "./components/Operation"

export const HeadLine = ({ children }) => {
  return <div className="headLine">{children}</div>;
};

const Sidebar = ({
  addLayersToState,
  removeLayersFromState,
  removeLayerFromState,
  layers,
  handleMetaChange,
  setDraw,
}) => {
  var selectedLayers = layers.filter((layer) => layer.selected);

  const { enqueueSnackbar } = useSnackbar();

  const layerOperation = getOperationFunction(
    enqueueSnackbar,
    addLayersToState
  );

  const onClickBuffer = () => {
    return (value) => {
      layerOperation(selectedLayers, "buffer", value)();
    };
  };

  useEffect(() => {
    pingApi(enqueueSnackbar);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sidebar">
      <List disablePadding>
        <HeadLine>
          <ListItem disableGutters>Operations</ListItem>
          <FunctionsIcon />
        </HeadLine>
        <Operation
          onClick={() => {
            setDraw((draw) => draw.changeMode("draw_polygon"));
          }}
          name="Draw Polygon"
          enabled={true}
        />
        <Operation
          name="Buffer"
          onClick={onClickBuffer()}
          selectable={true}
          enabled={selectedLayers.length >= 1}
        />
        <Operation
          name="Union"
          onClick={layerOperation(selectedLayers, "union")}
          enabled={selectedLayers.length >= 2}
        />
        <Operation
          name="Dissolve"
          onClick={layerOperation(selectedLayers, "dissolve")}
          enabled={selectedLayers.length === 1}
        ></Operation>

        <Operation
          onClick={calculateSplitGeoJSON(addLayersToState, selectedLayers)}
          name="Split"
          enabled={selectedLayers.length >= 1}
        />
        <Operation
          onClick={layerOperation(selectedLayers, "intersection")}
          name="Intersection"
          enabled={selectedLayers.length === 2}
        />
        <Operation
          onClick={layerOperation(selectedLayers, "bbox")}
          name="Bounding Box"
          enabled={selectedLayers.length >= 1}
        />
        <Operation
          onClick={layerOperation(selectedLayers, "symmetric_difference")}
          name="Symmetric Difference"
          enabled={selectedLayers.length === 2}
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
