import axios from "axios";
import config from "./config";

function updatePercentPerLang(PercentPerLangID, object) {
  return axios.put(
    "http://127.0.0.1:8000/percent_per_langs/" + PercentPerLangID,
    object
  );
}
function updatePercentPerCondition(PercentPerConditionID, object) {
  return axios.put(
    config.URL_API + "/percent_per_conditions/" + PercentPerConditionID,
    object
  );
}
function updatePercentPerConditionFoil(PercentPerConditionFoilID, object) {
  return axios.put(
    config.URL_API +
      "/percent_per_condition_foils/" +
      PercentPerConditionFoilID,
    object
  );
}

function updateFields(fieldObject, shopID) {
  return axios.put(config.URL_API + "/usersShop/" + shopID, fieldObject);
}

function getPublicInfos() {
  return axios
    .get(config.URL_API + "/shopInfos/" + config.shopID)
    .then((data) => data.data);
}

function getBuyingClauses() {
  return axios
    .get(config.URL_API + "/shopClauses/" + config.shopID)
    .then((data) => data.data);
}

export default {
  updatePercentPerLang,
  updatePercentPerCondition,
  updatePercentPerConditionFoil,
  updateFields,
  getPublicInfos,
  getBuyingClauses,
};
