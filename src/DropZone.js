import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PublishIconLarge from "@material-ui/icons/Publish";
import { ListItem } from "@material-ui/core";

function Dropzone({ addLayersToState, layers }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      let promises = [];
      for (let file of acceptedFiles) {
        let filePromise = new Promise((resolve) => {
          let fr = new FileReader();
          fr.readAsText(file);
          fr.onload = () => resolve(JSON.parse(fr.result));
        });
        promises.push(filePromise);
      }

      Promise.all(promises).then((files) => {
        addLayersToState(files, "upload");
      });
    },
    //eslint-disable-next-line
    [layers]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".json",
    onDrop,
  });

  return (
    <div className="upload">
      <input {...getInputProps()} />
      {!isDragActive ? (
        <div className="upload" {...getRootProps()}>
          <PublishIconLarge/>
          <ListItem>Upload</ListItem>
        </div>
      ) : (
        <div className="upload_drag" {...getRootProps()}>
          <PublishIconLarge />
          <ListItem>Upload</ListItem>
        </div>
      )}
    </div>
  );
}

export default Dropzone;
