import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import PublishIconLarge from "@material-ui/icons/Publish";


// Used inline styles because the useDropzone component had trouble reading the css-file
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

/** 
* This is the component that uses the useDropzone-library to create the upload-functionality to the site
* @param  addLayersToState - This is the function passed from App that enables adding of new layers to state
* @param  enqueueSnackbar - The enqueueSnackbar function is also passed from App, and enables the notification for successful upload
* @return The function returns the "Upload Layers"-field in the control panel
*/
function Dropzone({ addLayersToState, layers, enqueueSnackbar }) {
  /*
    This useCallback function is triggered on acceptet files, reading them and adding them to state
  */
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

    /*
    This useCallback function is triggered on rejected files, using the snackbar to show an error
     */
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
  } = useDropzone({ accept: [".json", ".geojson"], onDropAccepted, onDropRejected}); // Declaring the useDropzone, specifiying geojson and json as legal file-types

  /*
    useMemo is used to toggle styling of the component, if a user is dragging a file
     */
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  /*
    This is using the props from the useDropzone-hook to render the component. 
     */
  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      Upload Layers
      <PublishIconLarge />
    </div>
  );
}

export default Dropzone;
