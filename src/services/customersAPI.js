import axios from "axios";
import config from "./config";

function findAll(pageNumber, cleanUpParam) {
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/clients?page=" + pageNumber,
    cleanUpParam
  );
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
