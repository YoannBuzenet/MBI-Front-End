import axios from "axios";
import config from "./config";

function update(
  SellRequestCard,
  SellRequestCardPropertyName,
  SellRequestCardPropertyValue
) {
  var propertyUpdate;
  if (SellRequestCardPropertyName === "price") {
    propertyUpdate = {
      price: parseInt(SellRequestCardPropertyValue)
    };
  } else if (SellRequestCardPropertyName === "quantity") {
    propertyUpdate = {
      // card: "/cards/" + SellRequestCard.id,
      cardQuantity: SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName === "isFoil") {
    if (SellRequestCardPropertyValue === "Yes") {
      propertyUpdate = { isFoil: true };
    } else if (SellRequestCardPropertyValue === "No") {
      propertyUpdate = { isFoil: false };
    }
  } else if (SellRequestCardPropertyName === "isSigned") {
    if (SellRequestCardPropertyValue === "Yes") {
      propertyUpdate = { isSigned: true };
    } else if (SellRequestCardPropertyValue === "No") {
      propertyUpdate = { isSigned: false };
    }
  } else if (SellRequestCardPropertyName === "isAltered") {
    if (SellRequestCardPropertyValue === "Yes") {
      propertyUpdate = { isAltered: true };
    } else if (SellRequestCardPropertyValue === "No") {
      propertyUpdate = { isAltered: false };
    }
  } else if (SellRequestCardPropertyName === "lang") {
    propertyUpdate = {
      language: "/languages/" + SellRequestCardPropertyValue
    };
  } else if (SellRequestCardPropertyName === "condition") {
    propertyUpdate = {
      CardCondition: "/card_conditions/" + SellRequestCardPropertyValue
    };
  }

  console.log(propertyUpdate);

  return axios.put(
    config.URL_API + "/sell_request_cards/" + SellRequestCard.id,
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
    config.URL_API + "/sell_request_cards/" + idToReach,
    newCardProperties
  );
}

function deleteCard(id) {
  return axios.delete(config.URL_API + "/sell_request_cards/" + id);
}

export default {
  update,
  setUpdate,
  delete: deleteCard
};
