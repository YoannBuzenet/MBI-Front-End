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
      price: SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName == "quantity") {
    console.log("qté mise à jour");
    propertyUpdate = {
      // card: "/cards/" + SellRequestCard.id,
      cardQuantity: SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName == "isFoil") {
    console.log("isFoil mise à jour");
    if (SellRequestCardPropertyValue == "Yes") {
      SellRequestCardPropertyValue = true;
    } else if (SellRequestCardPropertyValue == "No") {
      SellRequestCardPropertyValue = false;
    }
  } else if (SellRequestCardPropertyName == "lang") {
    console.log("lang mise à jour");
    propertyUpdate = {
      language: "/languages/" + SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName == "condition") {
    console.log("condition mise à jour");
    propertyUpdate = {
      CardCondition: "/card_conditions/" + SellRequestCardPropertyValue
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
