import axios from "axios";
import config from "./config";

// FILE NOT USED FOR NOW as the info are stored locally. If this was to change (in case in new langages/conditions adding)
// This file would be needed

function getAllLang() {
  return axios
    .get(config.URL_API + "/languages")
    .then(response => response.data["hydra:member"]);
}

function getAllConditions() {
  return axios
    .get(config.URL_API + "/card_conditions")
    .then(response => response.data["hydra:member"]);
}

export default {
  getAllLang,
  getAllConditions
};
