const axios = require("axios");

function checkIfUserIsReallyLogged(sellRequestID, jwt) {
  axios.defaults.headers["Authorization"] = "Bearer " + jwt;
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests/" + sellRequestID
  );
}

module.exports = { checkIfUserIsReallyLogged };
