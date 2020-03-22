import axios from "axios";

function getArrayofPrices(arrayOfIdCards, baseLangID, cleaningParam) {
  return axios.get(
    "http://127.0.0.1:8000/card_shop_prices?shop.id=1&language.id[]=9&cardCondition.id=2&language.id[]=" +
      baseLangID +
      "&" +
      arrayOfIdCards.map(cardID => "card.id[]=" + cardID + "&").join(""),
    cleaningParam
  );
}

export default { getArrayofPrices };
