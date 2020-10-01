import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ addLayersToState }) {
  const onDrop = useCallback((acceptedFiles) => {
    let promises = [];
    for (let file of acceptedFiles) {
      let filePromise = new Promise(resolve => {
        let fr = new FileReader();
        fr.readAsText(file);
        fr.onload = () => resolve(JSON.parse(fr.result));
      });
      promises.push(filePromise);
    }

    Promise.all(promises).then((files) => {
        addLayersToState(files, "upload")
    });
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".json",
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>
          Drag some files here, or click to select files. Only *.json allowed
        </p>
      ) : (
        <p>
          Drag some files here, or click to select files. Only *.json allowed
        </p>
      )}
    </div>
  );
}

export default Dropzone;
