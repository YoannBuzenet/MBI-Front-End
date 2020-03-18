import axios from "axios";

function postOnePrice(cardInfo, cleaningParam) {
  return axios.post(
    "http://127.0.0.1:8000/card_shop_prices",
    cardInfo,
    cleaningParam
  );
}
function putOnePrice(cardInfo, cardShopPriceID, cleaningParam) {
  console.log("http://127.0.0.1:8000/card_shop_prices/" + cardShopPriceID);
  return axios.put(
    "http://127.0.0.1:8000/card_shop_prices/" + cardShopPriceID,
    cardInfo,
    cleaningParam
  );
}

function deleteOnePrice(cardShopPriceID, cleaningParam) {
  return axios.delete(
    "http://127.0.0.1:8000/card_shop_prices/" + cardShopPriceID,
    cleaningParam
  );
}

function batchPriceUpdate(batch, cleaningParam) {
  return axios.post(
    "http://127.0.0.1:8000/batchCardShopPrice",
    batch,
    cleaningParam
  );
}

function smoothNumbers(price) {
  if (price <= 0.05) {
    price = 0.01;
  } else if (price > 0.05 && price <= 0.1) {
    price = 0.05;
  } else if (price > 0.1 && price <= 0.14) {
    price = 0.1;
  } else if (price > 0.14 && price < 0.2) {
    price = 0.15;
  }

  return price;
}

export default {
  postOnePrice,
  putOnePrice,
  deleteOnePrice,
  batchPriceUpdate,
  smoothNumbers
};
