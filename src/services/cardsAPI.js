import axios from "axios";

function getByName(cardName, cleaningParam) {
  return axios.get(
    "http://127.0.0.1:8000/cards?name=" + cardName,
    cleaningParam
  );
}

function searchApproxByName(cardName, cleaningParam) {
  return axios.get(
    "http://127.0.0.1:8000/cardsearch?name=" + cardName,
    cleaningParam
  );
}

export default {
  getByName,
  searchApproxByName
};
