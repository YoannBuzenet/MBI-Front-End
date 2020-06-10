import axios from "axios";
import config from "./config";
import localStorageAPI from "./localStorageAPI";

function findAll() {
  return axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/sets")
    .then((data) => {
      //truc
      let allSetsCookie = {
        expirationDate: new Date().getTime() + config.TIME_TO_EXPIRE_SET_LIST,
        data: data.data["hydra:member"],
      };
      localStorageAPI.saveLocalStorage("allSets", allSetsCookie);
      return data;
    })
    .then((response) => response.data["hydra:member"]);
}

function findOneById(id, cleanUpParam) {
  return axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/sets/" + id, cleanUpParam)
    .then((response) => response.data.cards);
}

export default {
  findAll,
  findOneById,
};
