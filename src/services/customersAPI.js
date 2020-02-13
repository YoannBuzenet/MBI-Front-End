import axios from "axios";

function findAll(cleanUpParam) {
  return axios
    .get("http://127.0.0.1:8000/clients", cleanUpParam)
    .then(response => response.data["hydra:member"]);
}

function findOneById(id) {
  return axios
    .get("http://127.0.0.1:8000/clients/" + id)
    .then(response => response.data.cards);
}

export default {
  findAll,
  findOneById
};
