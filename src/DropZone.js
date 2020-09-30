import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as data from "./data/layer.json";

function Dropzone({addLayerToState}) {

  const onDrop = useCallback((acceptedFiles) => {
      addLayerToState(data['default'], "upload")
  }, [addLayerToState]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: ".json", onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drag some files here, or click to select files. Only *.json allowed</p>
      ) : (
        <p>Drag some files here, or click to select files. Only *.json allowed</p>
      )}
    </div>
  );
}

export default Dropzone;
