import axios from "axios";
import * as data from "../data/sample.json";

function cleanResponse(response) {
  delete response.data["bbox"];
  delete response.data["features"]["bbox"];
  return response.data
}

function calculateBuffer(addLayerToState) {
  return function () {
    axios
      .post("http://localhost:5000/api/buffer", data["default"])
      .then((response) => {
        console.log(addLayerToState)
        const layer = cleanResponse(response)
        addLayerToState(layer);
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  };
}

export default calculateBuffer;
