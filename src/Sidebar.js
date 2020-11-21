import React, { useState, useEffect } from "react";
import DropZone from "./DropZone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LayerBar from "./LayerBar";
import LayersIcon from "@material-ui/icons/Layers";
import FunctionsIcon from "@material-ui/icons/Functions";
import ArrowForward from "@material-ui/icons/ArrowForwardIosOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import InputField from "./components/InputField";
import { ClearOutlined, CheckOutlined } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import {
  calculateSplitGeoJSON,
  getOperationFunction,
  pingApi,
} from "./utils/APIConnection";

export const HeadLine = ({ children }) => {
  return <div className="headLine">{children}</div>;
};

export const Operation = ({ children, onClick }) => {
  return (
    <div className="operation" onClick={onClick}>
      {children}
    </div>
  );
};

export const Operation2 = ({ onClick, name, icon, selectable }) => {
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(10);
  
  const toggleSelect = () => {
    return setSelected(!selected);
  };

  const closeAndExectue = (value) => {
    onClick(value);
    toggleSelect();
  };
  return !selected ? (
    <div className="operation" onClick={selectable ? toggleSelect : onClick}>
      <ListItem disableGutters>{name}</ListItem>
      {icon ? icon : <ArrowForward />}
    </div>
  ) : (
    <div className="operation">
      <ListItem disableGutters>
        <InputField
          value={value}
          handleChange={(e) => setValue(e.target.value)}
        />
      </ListItem>
      <ClearOutlined onClick={toggleSelect} />
      <CheckOutlined onClick={() => closeAndExectue(value)} />
    </div>
  );
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

  useEffect(() => {
    pingApi(enqueueSnackbar);
    // eslint-disable-next-line
  }, []);

  const onClickBuffer = () => {
    return (value) => {
      layerOperation(selectedLayers, "buffer", value)();
    }
  };

  return (
    <div className="sidebar">
      <List disablePadding>
        <HeadLine>
          <ListItem disableGutters>Operations</ListItem>
          <FunctionsIcon />
        </HeadLine>
        <Operation2
          onClick={() => {
            setDraw((draw) => draw.changeMode("draw_polygon"));
          }}
          name="Draw Polygon"
        />
        <Operation2
          name="Buffer"
          onClick={onClickBuffer()}
          selectable={true}
        />
        <Operation2
          name="Union"
          onClick={layerOperation(selectedLayers, "union")}
        />
        <Operation2
          name="Dissolve"
          onClick={layerOperation(selectedLayers, "dissolve")}
        ></Operation2>

        <Operation2
          onClick={calculateSplitGeoJSON(addLayersToState, selectedLayers)}
          name="Split"
        />
        <Operation2
          onClick={layerOperation(selectedLayers, "intersection")}
          name="Intersection"
        />
        <Operation2
          onClick={layerOperation(selectedLayers, "bbox")}
          name="Bounding Box"
        />
        <Operation2
          onClick={layerOperation(selectedLayers, "symmetric_difference")}
          name="Symmetric Difference"
        />
        <Operation2
          onClick={removeLayersFromState}
          name="Remove All Layers"
          icon={<ClearOutlinedIcon />}
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
