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

  const urlStringifiedThenParsed = JSON.parse(
    JSON.stringify(
      process.env.REACT_APP_MTGAPI_URL +
        "/usersShop​/" +
        process.env.REACT_APP_SHOP_ID
    )
  );

  // console.log(JSON.stringify(process.env.REACT_APP_SHOP_ID));
  // console.log(
  //   "stringified + parsed",
  //   urlStringifiedThenParsed
  // );

  const myURL = new URL(
    "/usersShop​/" + process.env.REACT_APP_SHOP_ID,
    process.env.REACT_APP_MTGAPI_URL
  );

  // console.log("my custom url", myURL);

  const url_escaped = encodeURIComponent(
    process.env.REACT_APP_MTGAPI_URL +
      "/usersShop​/" +
      process.env.REACT_APP_SHOP_ID
  );

  // console.log(
  //   process.env.REACT_APP_MTGAPI_URL +
  //     "/usersShop​/" +
  //     process.env.REACT_APP_SHOP_ID
  // );

  return axios.put(myURL.href, {});
}

module.exports = { checkIfUserIsReallyLogged, checkIfUserIsCurrentShop };
