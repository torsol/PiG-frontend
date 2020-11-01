import axios from "axios";


//const HOST = "http://10.53.26.143:5000"
const HOST = "https://tba4251-api.herokuapp.com/"

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
      .post(HOST + "/api/buffer", requestData)
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
      .post(HOST + "/api/union", requestData)
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
      .post(HOST + "/api/intersection", requestData)
      .then((response) => {
        addLayersToState([response.data], "intersection");
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}
