import axios from "axios";
import config from "./config";

function findAll(cleanUpParam) {
  return axios
    .get(config.URL_API + "/clients", cleanUpParam)
    .then(response => response.data["hydra:member"]);
}

function findOneById(id, cleanUpParam) {
  return axios.get(config.URL_API + "/clients/" + id, cleanUpParam);
}

export default {
  findAll,
  findOneById
};
