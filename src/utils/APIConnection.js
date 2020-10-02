import axios from "axios";


const HOST = "10.53.26.143:5000"

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

export function calculateBuffer(addLayersToState, inputData) {
  let requestData = concatGeoJSON(inputData);
  requestData["value"] = 10;

  return function () {
    axios
      .post("http://" + HOST + "/api/buffer", requestData)
      .then((response) => {
        addLayersToState([response.data], "buffer");
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}

export function calculateUnion(addLayersToState, inputData) {
  return function () {
    let requestData = concatGeoJSON(inputData);
    axios
      .post("http://" + HOST + "/api/union", requestData)
      .then((response) => {
        addLayersToState([response.data], "union");
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}

export function calculateIntersection(addLayersToState, inputData) {
  return function () {
    let requestData = concatGeoJSON(inputData);
    axios
      .post("http://" + HOST + "/api/intersection", requestData)
      .then((response) => {
        addLayersToState([response.data], "intersection");
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}
