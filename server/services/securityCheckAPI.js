const axios = require("axios");
const url = require("url");

function checkIfUserIsReallyLogged(sellRequestID, jwt) {
  axios.defaults.headers["Authorization"] = "Bearer " + jwt;
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests/" + sellRequestID
  );
}

function checkIfUserIsCurrentShop(jwt) {
  axios.defaults.headers["Authorization"] = jwt;

  let normalURL =
    process.env.REACT_APP_MTGAPI_URL +
    "/usersShop​/" +
    process.env.REACT_APP_SHOP_ID;

  normalURL = normalURL.replace(/[\u200B-\u200D\uFEFF]/g, "");

  return axios.put(normalURL, {});
}

module.exports = { checkIfUserIsReallyLogged, checkIfUserIsCurrentShop };
