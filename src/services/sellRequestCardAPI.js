import axios from "axios";

function update(
  SellRequestCard,
  SellRequestCardPropertyName,
  SellRequestCardPropertyValue
) {
  console.log(SellRequestCardPropertyName);
  console.log(SellRequestCardPropertyValue);
  var propertyUpdate;
  if (SellRequestCardPropertyName == "price") {
    propertyUpdate = {
      card: "/cards/" + SellRequestCard.id,
      price: SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName == "quantity") {
    console.log("qté mise à jour");
    propertyUpdate = {
      // card: "/cards/" + SellRequestCard.id,
      cardQuantity: SellRequestCardPropertyValue
    };
  }

  console.log(propertyUpdate);
  return axios.put(
    "http://127.0.0.1:8000/sell_request_cards/" + SellRequestCard.id,
    propertyUpdate
  );
}

export default {
  update
};
