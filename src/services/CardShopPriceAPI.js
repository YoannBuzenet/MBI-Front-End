import axios from "axios";

function getArrayofPrices(arrayOfIdCards, baseLangID, cleaningParam) {
  //   console.log(
  //     "http://127.0.0.1:8000/card_shop_prices?shop.id=1&language.id[]=9&cardCondition.id=2&language.id[]=" +
  //       baseLangID +
  //       "&" +
  //       arrayOfIdCards.map(cardID => "card.id[]=" + cardID + "&").join("")
  //   );
  return axios.get(
    "http://127.0.0.1:8000/card_shop_prices?shop.id=1&language.id[]=9&cardCondition.id=2&language.id[]=" +
      baseLangID +
      "&" +
      arrayOfIdCards.map(cardID => "card.id[]=" + cardID + "&").join(""),
    cleaningParam
  );
}

function getOnePrice(shopID, cardID, langID, conditionID, isFoil) {
  console.log("function called");

  if (isFoil === true || isFoil === "Yes") {
    isFoil = 1;
  } else {
    isFoil = 0;
  }
  console.log(
    "http://127.0.0.1:8000/card_shop_prices?shop.id" +
      shopID +
      "&card.id=" +
      cardID +
      "&language.id=" +
      langID +
      "&cardCondition.id=" +
      conditionID +
      "&isFoil=" +
      isFoil
  );
  return axios.get(
    "http://127.0.0.1:8000/card_shop_prices?shop.id" +
      shopID +
      "&card.id=" +
      cardID +
      "&language.id=" +
      langID +
      "&cardCondition.id=" +
      conditionID +
      "&isFoil=" +
      isFoil
  );
}

export default { getArrayofPrices, getOnePrice };
