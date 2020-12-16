import React from "react";
import Layer from "./Layer";


/** 
* This is the component creating and containing all the Layer-components
* @param  layer - all layers in state
* @param  removeLayerFromState - Function that enables the removal of the layer from the layerbar
* @param  handleMetaChange - function that allows name- and visibility change
* @return - a scrollable list of layers
*/
const LayerBar = ({
  layers,
  removeLayerFromState,
  handleMetaChange,
}) => {
  return (
    <div className="scroll">
      {layers &&
        layers.map((layer) => {
          return (
            <Layer
              key={layer.id}
              layer={layer}
              removeLayerFromState={removeLayerFromState}
              handleMetaChange={handleMetaChange}
            />
          );
        })}
    </div>
  );
};

export default LayerBar;
