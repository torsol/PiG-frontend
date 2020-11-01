import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import PublishIconLarge from "@material-ui/icons/Publish";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "20px",
  paddingLeft: "20px",
  paddingRight: "20px",
  borderWidth: 2,
  borderRadius: 4,
  borderColor: "black",
  borderStyle: "solid",
  backgroundColor: "#e7e7e7",
  color: "black",
  outline: "none",
  justifyContent: "space-around",
  //transition: "border .24s ease-in-out",
  fontSize: "18px",
};

const activeStyle = {
  backgroundColor: "#3a3a3a",
  color: "white",
};

const acceptStyle = {
  borderColor: "white",
};

const rejectStyle = {
  borderColor: "white",
  borderStyle: "solid"
};

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

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: ".json", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <text>Upload Layers</text>
      <PublishIconLarge />
    </div>
  );
}

export default Dropzone;