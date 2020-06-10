import axios from "axios";
import config from "./config";

function send(sellRequestData) {
  return axios.post(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests",
    sellRequestData
  );
}

function findAll(cleanUpParam) {
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests",
    cleanUpParam
  );
}

function findById(id, cleanUpParam) {
  return axios
    .get(
      process.env.REACT_APP_MTGAPI_URL + "/sell_requests/" + id,
      cleanUpParam
    )
    .then((response) => response.data);
}

function update(id, newData) {
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests/" + id,
    newData
  );
}

function updateAsShop(id, newData) {
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requestsShop/" + id,
    newData
  );
}

export default {
  send,
  update,
  updateAsShop,
  findAll,
  findById,
};
