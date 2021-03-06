import axios from "axios";
import config from "./config";

function getArrayofPrices(arrayOfIdCards, baseLangID, cleaningParam) {
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL +
      "/card_shop_prices?shop.id=" +
      process.env.REACT_APP_SHOP_ID +
      "&language.id[]=9&cardCondition.id=2&isSigned=false&language.id[]=" +
      baseLangID +
      "&" +
      arrayOfIdCards.map((cardID) => "card.id[]=" + cardID + "&").join(""),
    cleaningParam
  );
}

function getOnePrice(shopID, cardID, langID, conditionID, isFoil, isSigned) {
  if (isFoil === true || isFoil === "Yes") {
    isFoil = 1;
  } else {
    isFoil = 0;
  }
  if (isSigned === true || isSigned === "Yes") {
    isSigned = 1;
  } else {
    isSigned = 0;
  }

  return axios.get(
    process.env.REACT_APP_MTGAPI_URL +
      "/card_shop_prices?shop.id=" +
      shopID +
      "&card.id=" +
      cardID +
      "&language.id=" +
      langID +
      "&cardCondition.id=" +
      conditionID +
      "&isFoil=" +
      isFoil +
      "&isSigned=" +
      isSigned
  );
}

function getAllCSPFromOneEdition(cardID) {
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL +
      "/card_shop_prices.json?shop.id=" +
      process.env.REACT_APP_SHOP_ID +
      "&card.id=" +
      cardID
  );
}

export default { getArrayofPrices, getOnePrice, getAllCSPFromOneEdition };
