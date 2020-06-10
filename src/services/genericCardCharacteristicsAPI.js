import axios from "axios";

function getAllLang() {
  return axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/languages")
    .then((response) => response.data["hydra:member"]);
}

function getAllConditions() {
  return axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/card_conditions")
    .then((response) => response.data["hydra:member"]);
}

export default {
  getAllLang,
  getAllConditions,
};
