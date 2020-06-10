import axios from "axios";
import config from "./config";

function postOnePrice(cardInfo, cleaningParam) {
  return axios.post(
    process.env.REACT_APP_MTGAPI_URL + "/card_shop_prices",
    cardInfo,
    cleaningParam
  );
}
function putOnePrice(cardInfo, cardShopPriceID, cleaningParam) {
  // console.log(process.env.REACT_APP_MTGAPI_URL + "/card_shop_prices/" + cardShopPriceID);
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL + "/card_shop_prices/" + cardShopPriceID,
    cardInfo,
    cleaningParam
  );
}

function deleteOnePrice(cardShopPriceID, cleaningParam) {
  return axios.delete(
    process.env.REACT_APP_MTGAPI_URL + "/card_shop_prices/" + cardShopPriceID,
    cleaningParam
  );
}

function batchPriceUpdate(batch, cleaningParam) {
  console.log("batch sent");
  return axios.post(
    process.env.REACT_APP_MTGAPI_URL + "/batchCardShopPrice",
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
  return parseFloat(price.toFixed(2));
}

function smoothFloatKeepEntireComplete(number) {
  if (number % 1 !== 0) {
    return parseFloat(number.toFixed(2));
  } else {
    return number;
  }
}

export default {
  postOnePrice,
  putOnePrice,
  deleteOnePrice,
  batchPriceUpdate,
  smoothNumbers,
  smoothFloatKeepEntireComplete,
};
