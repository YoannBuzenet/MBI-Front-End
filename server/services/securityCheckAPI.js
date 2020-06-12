const axios = require("axios");

function checkIfUserIsReallyLogged(sellRequestID, jwt) {
  //user ID + user token to add to axios ?
  axios.defaults.headers["Authorization"] = "Bearer " + jwt;
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests/" + id,
    cleanUpParam
  );
}
