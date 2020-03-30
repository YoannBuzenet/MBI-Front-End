import axios from "axios";
import config from "./config";

function getArrayofPrices(arrayOfIdCards, baseLangID, cleaningParam) {
  return axios.get(
    config.URL_API +
      "/card_shop_prices?shop.id=1&language.id[]=9&cardCondition.id=2&language.id[]=" +
      baseLangID +
      "&" +
      arrayOfIdCards.map(cardID => "card.id[]=" + cardID + "&").join(""),
    cleaningParam
  );
}

function getOnePrice(shopID, cardID, langID, conditionID, isFoil, isSigned) {
  console.log("function called");

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
  console.log(
    config.URL_API +
      "/card_shop_prices?shop.id" +
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

  return axios.get(
    config.URL_API +
      "/card_shop_prices?shop.id" +
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

export default { getArrayofPrices, getOnePrice };
