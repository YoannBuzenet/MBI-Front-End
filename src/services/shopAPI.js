import axios from "axios";
import config from "./config";

function updatePercentPerLang(PercentPerLangID, object) {
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL + "/percent_per_langs/" + PercentPerLangID,
    object
  );
}
function updatePercentPerCondition(PercentPerConditionID, object) {
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL +
      "/percent_per_conditions/" +
      PercentPerConditionID,
    object
  );
}
function updatePercentPerConditionFoil(PercentPerConditionFoilID, object) {
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL +
      "/percent_per_condition_foils/" +
      PercentPerConditionFoilID,
    object
  );
}

function updateFields(fieldObject, shopID) {
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL + "/usersShop/" + shopID,
    fieldObject
  );
}

function getPublicInfos() {
  return axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/shopInfos/" + config.shopID)
    .then((data) => data.data);
}

function getBuyingClauses() {
  return axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/shopClauses/" + config.shopID)
    .then((data) => data.data);
}

function getShopSellingSettings(authContext) {
  console.log("getting shop settings");
  console.log(authContext);
  return axios.post(
    process.env.REACT_APP_EXPRESSAPI + "/api/shop/TryToGetSellingSettings/",
    { id: authContext.customer.id }
  );
}

export default {
  updatePercentPerLang,
  updatePercentPerCondition,
  updatePercentPerConditionFoil,
  updateFields,
  getPublicInfos,
  getBuyingClauses,
  getShopSellingSettings,
};
