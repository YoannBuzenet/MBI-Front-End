import axios from "axios";

function update(
  SellRequestCard,
  SellRequestCardPropertyName,
  SellRequestCardPropertyValue
) {
  var propertyUpdate;
  if (SellRequestCardPropertyName == "price") {
    propertyUpdate = {
      price: parseInt(SellRequestCardPropertyValue)
    };
  } else if (SellRequestCardPropertyName == "quantity") {
    propertyUpdate = {
      // card: "/cards/" + SellRequestCard.id,
      cardQuantity: SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName == "isFoil") {
    if (SellRequestCardPropertyValue == "Yes") {
      SellRequestCardPropertyValue = true;
    } else if (SellRequestCardPropertyValue == "No") {
      SellRequestCardPropertyValue = false;
    }
  } else if (SellRequestCardPropertyName == "lang") {
    propertyUpdate = {
      language: "/languages/" + SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName == "condition") {
    propertyUpdate = {
      CardCondition: "/card_conditions/" + SellRequestCardPropertyValue
    };
  }

  return axios.put(
    "http://127.0.0.1:8000/sell_request_cards/" + SellRequestCard.id,
    propertyUpdate
  );
}

export default {
  update
};
