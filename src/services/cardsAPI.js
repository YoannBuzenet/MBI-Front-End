import axios from "axios";
import config from "./config";

function getByName(cardName, cleaningParam) {
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/cards?name=" + cardName,
    cleaningParam
  );
}

function searchApproxByName(cardName, cleaningParam) {
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/cardsearch?name=" + cardName,
    cleaningParam
  );
}

function getById(id) {
  return axios.get(process.env.REACT_APP_MTGAPI_URL + "/cards/" + id);
}

function getSmallPictureFromScryfallId(card) {
  const firstCharac = card.scryfallid.substr(0, 1);
  const secondCharac = card.scryfallid.substr(1, 1);
  return (
    "https://img.scryfall.com/cards/small/front/" +
    firstCharac +
    "/" +
    secondCharac +
    "/" +
    card.scryfallid +
    ".jpg"
  );
}

export default {
  getByName,
  getById,
  searchApproxByName,
  getSmallPictureFromScryfallId,
};
