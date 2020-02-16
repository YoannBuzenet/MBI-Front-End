import axios from "axios";

function update(
  SellRequestCard,
  SellRequestCardPropertyName,
  SellRequestCardPropertyValue
) {
  var propertyUpdate;
  if (SellRequestCardPropertyName == "price") {
    propertyUpdate = { price: SellRequestCardPropertyValue };
  } else if (SellRequestCardPropertyName == "cardQuantity") {
    propertyUpdate = { cardQuantity: SellRequestCardPropertyValue };
  } else {
    return;
  }
  return axios.put(
    "http://127.0.0.1:8000/sell_request_card/" + SellRequestCard.id,
    propertyUpdate
  );
}

export default {
  update
};
