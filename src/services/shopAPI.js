import axios from "axios";

function updatePercentPerLang(PercentPerLangID, object) {
  return axios.put(
    "http://127.0.0.1:8000/percent_per_langs/" + PercentPerLangID,
    object
  );
}
function updatePercentPerCondition(PercentPerConditionID, object) {
  return axios.put(
    "http://127.0.0.1:8000/percent_per_conditions/" + PercentPerConditionID,
    object
  );
}
function updatePercentPerConditionFoil(PercentPerConditionFoilID, object) {
  return axios.put(
    "http://127.0.0.1:8000/percent_per_condition_foils/" +
      PercentPerConditionFoilID,
    object
  );
}

export default {
  updatePercentPerLang,
  updatePercentPerCondition,
  updatePercentPerConditionFoil
};
