import axios from "axios";

function getAllLang() {
  return axios
    .get("http://127.0.0.1:8000/languages")
    .then(response => response.data["hydra:member"]);
}

export default {
  getAllLang
};
