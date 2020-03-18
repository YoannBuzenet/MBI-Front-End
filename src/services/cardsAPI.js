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
  searchApproxByName,
  getSmallPictureFromScryfallId
};
