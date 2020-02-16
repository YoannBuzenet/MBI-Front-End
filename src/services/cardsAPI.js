import axios from "axios";

function getByName(cardName) {
  return axios.get("http://127.0.0.1:8000/cards?name=" + cardName);
}

export default {
  getByName
};
