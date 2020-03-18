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

function roundCentsHalfDecadeDown(number) {
  return number - (number % 0.05);
}

function roundCentsQuarterUnitDown(number) {
  return number - (number % 0.25);
}

function roundCentsHalfUnitDown(number) {
  return number - (number % 0.5);
}
function roundUnitDown(number) {
  return number - (number % 1);
}
function roundUnit5Down(number) {
  return number - (number % 5);
}
function roundUnit25Down(number) {
  return number - (number % 25);
}
function roundUnit50Down(number) {
  return number - (number % 50);
}

function smoothNumbers(price) {
  if (price <= 0.05) {
    price = 0.01;
  } else if (price > 0.05 && price <= 1) {
    price = roundCentsHalfDecadeDown(price);
  } else if (price > 1 && price <= 2.5) {
    price = roundCentsQuarterUnitDown(price);
  } else if (price > 2.5 && price <= 10) {
    price = roundCentsHalfUnitDown(price);
  } else if (price > 10 && price <= 100) {
    price = roundUnitDown(price);
  } else if (price > 100 && price <= 300) {
    price = roundUnit5Down(price);
  } else if (price > 300 && price <= 500) {
    price = roundUnit25Down(price);
  } else {
    price = roundUnit50Down(price);
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
