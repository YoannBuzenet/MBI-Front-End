import axios from "axios";
import config from "./config";

function findAll(cleanUpParam) {
  return axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/clients", cleanUpParam)
    .then((response) => response.data["hydra:member"]);
}

function findOneById(id, cleanUpParam) {
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/clients/" + id,
    cleanUpParam
  );
}

export default {
  findAll,
  findOneById,
};
