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
      propertyUpdate = { isFOil: true };
    } else if (SellRequestCardPropertyValue == "No") {
      propertyUpdate = { isFOil: false };
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

  console.log(propertyUpdate);

  return axios.put(
    "http://127.0.0.1:8000/sell_request_cards/" + SellRequestCard.id,
    propertyUpdate
  );
}

function setUpdate(IRItoUpdate, newLangID, idToReach) {
  // préparation de newCardProperties object
  var newCardProperties = {
    cards: "/cards/" + IRItoUpdate,
    language: "/languages/" + newLangID
  };

  return axios.put(
    "http://127.0.0.1:8000/sell_request_cards/" + idToReach,
    newCardProperties
  );
}

function deleteCard(id) {
  return axios.delete("http://127.0.0.1:8000/sell_request_cards/" + id);
}

export default {
  update,
  setUpdate,
  delete: deleteCard
};
