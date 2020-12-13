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
  backgroundColor: "#43a047",
  color: "white",
  outline: "none",
  justifyContent: "space-around",
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

function Dropzone({ addLayersToState, layers, enqueueSnackbar }) {
  const onDropAccepted = useCallback(
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
        enqueueSnackbar("Successfully added layers to state", { variant: "success"})
      });
    },
    //eslint-disable-next-line
    [layers]
  );

  const onDropRejected = useCallback(
    (rectedFiles) => {
        enqueueSnackbar("Error adding selected layers, try a valid geojson- or json-file", { variant: "error"})
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
  } = useDropzone({ accept: [".json", ".geojson"], onDropAccepted, onDropRejected});

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
      Upload Layers
      <PublishIconLarge />
    </div>
  );
}

export default Dropzone;
