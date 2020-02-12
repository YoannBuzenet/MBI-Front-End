import axios from "axios";

function send(sellRequestData) {
  return axios.post("http://127.0.0.1:8000/sell_requests", sellRequestData);
}

function findAll() {
  return axios.get("http://127.0.0.1:8000/sell_requests");
}

function findById(id, cleanUpParam) {
  return axios
    .get("http://127.0.0.1:8000/sell_requests/" + id, cleanUpParam)
    .then(response => response.data);
}

export default {
  send,
  findAll,
  findById
};
