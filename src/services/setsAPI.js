import axios from "axios";
import config from "./config";

function findAll() {
  return axios
    .get(config.URL_API + "/sets")
    .then(response => response.data["hydra:member"]);
}

function findOneById(id, cleanUpParam) {
  return axios
    .get(config.URL_API + "/sets/" + id, cleanUpParam)
    .then(response => response.data.cards);
}

export default {
  findAll,
  findOneById
};
