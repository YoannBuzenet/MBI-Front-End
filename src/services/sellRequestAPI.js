import axios from "axios";

function send(sellRequestData) {
  return axios.post("http://127.0.0.1:8000/sell_requests", sellRequestData);
}

function findAll(cleanUpParam) {
  return axios.get("http://127.0.0.1:8000/sell_requests", cleanUpParam);
}

function findById(id, cleanUpParam) {
  return axios
    .get("http://127.0.0.1:8000/sell_requests/" + id, cleanUpParam)
    .then(response => response.data);
}

function update(id, newData) {
  return axios.put("http://127.0.0.1:8000/sell_requests/" + id, newData);
}

function updateAsShop(id, newData) {
  return axios.put("http://127.0.0.1:8000/sell_requestsShop/" + id, newData);
}

export default {
  send,
  update,
  updateAsShop,
  findAll,
  findById
};
