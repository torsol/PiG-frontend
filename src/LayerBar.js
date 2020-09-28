import React from "react";

const LayerBar = ({ layers }) => {

  return (
    <div>
      {layers &&
        layers.map((layer) => {
          return <div key={layer.id}>{layer.name}</div>;
        })}
    </div>
  );
};

export default LayerBar;
