import axios from "axios";

function postOnePrice(cardInfo, cleaningParam) {
  return axios.post(
    "http://127.0.0.1:8000/card_shop_prices",
    cardInfo,
    cleaningParam
  );
}
function putOnePrice(cardInfo, cardID, cleaningParam) {
  return axios.put(
    "http://127.0.0.1:8000/card_shop_prices/" + cardID,
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

export default { postOnePrice, putOnePrice, deleteOnePrice };
