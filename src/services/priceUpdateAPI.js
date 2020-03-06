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

export default { postOnePrice, putOnePrice, deleteOnePrice, batchPriceUpdate };
