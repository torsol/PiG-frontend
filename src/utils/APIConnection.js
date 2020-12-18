import axios from "axios";

//const HOST = "http://localhost:5000/api/";
const HOST = "https://tba4251-api.herokuapp.com/api/"

function concatGeoJSON(list) {
  // used to combine features into one geojson for backend processing
  let features = [];

  list.forEach((feature) => {
    features = [...feature.features, ...features];
  });

  let newGeoJSON = {
    type: "FeatureCollection",
    features: features,
  };

  return newGeoJSON;
}

export function pingApi(enqueueSnackbar){
  axios
      .get(HOST + "ping")
      .then((response) => {
        enqueueSnackbar("Successfully connected with backend", { variant: "success"})
      })
      .catch(function (error) {
        enqueueSnackbar("Failed to connect with backend", { variant: "success"})
        // manipulate the error response here
      });
}

export function getOperationFunction(enqueueSnackbar, addLayersToState) {
  return function(inputData, operation, value){
    let requestData = concatGeoJSON(inputData);
    if (value) requestData["value"] = value;

    return function () {
      axios
      .post(HOST + operation, requestData)
      .then((response) => {
        if(operation === "symmetric_difference") operation = "sym_diff"
        addLayersToState([response.data], operation);
        enqueueSnackbar("Successfully computed " + operation, { variant: "success"})
      })
      .catch(function (error) {
        enqueueSnackbar("Failed to execute  " + operation + " " + error, { variant: "error"})
        // manipulate the error response here
      });
  };
  }
}
export function calculateSplitGeoJSON(addLayersToState, inputData) {
  return function () {
    // used to combine features into one geojson for backend processing
    let layers = [];
    console.log(inputData)
    inputData[0].features.forEach((feature) => {
      let newGeoJSON = {
        type: "FeatureCollection",
        features: [feature],
      };

      layers = layers.concat(newGeoJSON);
    });
    addLayersToState(layers, "split");
  };
}
