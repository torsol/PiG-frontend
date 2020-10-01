import axios from "axios";

function concatGeoJSON(list) { // used to combine features into one geojson for backend processing
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

export function calculateBuffer(addLayerToState, inputData) {
  if (inputData[0]) {
    let processedInput = {};
    processedInput = inputData[0];
    processedInput["value"] = 10;
    inputData = processedInput;
  }

  return function () {
    axios
      .post("http://localhost:5000/api/buffer", inputData)
      .then((response) => {
        addLayerToState(response.data, "buffer");
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}

export function calculateUnion(addLayerToState, inputData) {
  return function () {
    let requestData = concatGeoJSON(inputData);
    axios
      .post("http://localhost:5000/api/union", requestData)
      .then((response) => {
        addLayerToState(response.data, "union");
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}

// create method that combines selected layers to one featurecollection
// create method that allows adding of multiple layers to state
// create method that allows multiple uploads of data
