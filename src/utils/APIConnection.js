import axios from "axios";
import * as data from "../data/sample.json";

function cleanResponse(response) {
  delete response.data["bbox"];
  delete response.data["features"]["bbox"];
  return response.data
}

function calculateBuffer(addLayerToState, inputData) {
  if (inputData[0]){
    let processedInput = {}
    processedInput = inputData[0]
    processedInput['value'] = 10
    inputData = processedInput
  }

  return function () {
    axios
      .post("http://localhost:5000/api/buffer", inputData)
      .then((response) => {
        const layer = cleanResponse(response)
        addLayerToState(layer, "buffer");
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}

export default calculateBuffer;
