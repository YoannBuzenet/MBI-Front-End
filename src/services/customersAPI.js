import axios from "axios";

function findAll(cleanUpParam) {
  return axios
    .get("http://127.0.0.1:8000/clients", cleanUpParam)
    .then(response => response.data["hydra:member"]);
}

function findOneById(id, cleanUpParam) {
  return axios.get("http://127.0.0.1:8000/clients/" + id, cleanUpParam);
}

export default {
  findAll,
  findOneById
};
