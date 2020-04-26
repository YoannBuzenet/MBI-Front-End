import axios from "axios";
import config from "./config";

function getAllLang() {
  return axios
    .get(config.URL_API + "/languages")
    .then((response) => response.data["hydra:member"]);
}

function getAllConditions() {
  return axios
    .get(config.URL_API + "/card_conditions")
    .then((response) => response.data["hydra:member"]);
}

export default {
  getAllLang,
  getAllConditions,
};
