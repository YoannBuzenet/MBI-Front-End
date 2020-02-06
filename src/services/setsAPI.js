import axios from "axios";

function findAll() {
  return axios
    .get("http://127.0.0.1:8000/sets")
    .then(response => response.data["hydra:member"]);
}

function findOneById(id) {
  return axios
    .get("http://127.0.0.1:8000/sets/" + id)
    .then(response => response.data.cards);
}

export default {
  findAll,
  findOneById
};
