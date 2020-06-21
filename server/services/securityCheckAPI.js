const axios = require("axios");

function checkIfUserIsReallyLogged(sellRequestID, jwt) {
  axios.defaults.headers["Authorization"] = "Bearer " + jwt;
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests/" + sellRequestID
  );
}

function checkIfUserIsCurrentShop(jwt) {
  axios.defaults.headers["Authorization"] = jwt;

  console.log(JSON.stringify(process.env.REACT_APP_SHOP_ID));
  console.log(
    JSON.stringify(
      process.env.REACT_APP_MTGAPI_URL +
        "/usersShop​/" +
        process.env.REACT_APP_SHOP_ID
    )
  );

  const url_escaped = encodeURIComponent(
    process.env.REACT_APP_MTGAPI_URL +
      "/usersShop​/" +
      process.env.REACT_APP_SHOP_ID
  );

  console.log(
    process.env.REACT_APP_MTGAPI_URL +
      "/usersShop​/" +
      process.env.REACT_APP_SHOP_ID
  );

  return axios.put(
    process.env.REACT_APP_MTGAPI_URL +
      "/usersShop​/" +
      process.env.REACT_APP_SHOP_ID,
    {}
  );
}

module.exports = { checkIfUserIsReallyLogged, checkIfUserIsCurrentShop };
