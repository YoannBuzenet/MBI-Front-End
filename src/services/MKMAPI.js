import axios from "axios";
import hmacSHA1 from "crypto-js/hmac-sha1";
import Base64 from "crypto-js/enc-base64";
//https://api.cardmarket.com/ws/documentation/API_2.0:Stock

// <?xml version="1.0" encoding="UTF-8" ?>
// <request>
//     <article>
//         <idProduct>100569</idProduct>
//         <idLanguage>1</idLanguage>
//         <comments>Inserted through the API</comments>
//         <count>1</count>
//         <price>4</price>
//         <condition>EX</condition>
//         <isFoil>true</isFoil>
//         <isSigned>false</isSigned>
//         <isPlayset>false</isPlayset>
//     </article>
// </request>

const URL_MKM_ADD_STOCK = "https://api.cardmarket.com/ws/v2.0/stock";
const URL_MKM_SANDBOX_ADD_STOCK =
  "https://sandbox.cardmarket.com/ws/v2.0/stock";

function setSellingMKMPrice(number) {
  //Put here any algorithms with maybe parameters to ajdust the price
  return number;
}

function calculateSigningKey(appSecret, accessTokenSecret) {
  const signingKey =
    encodeURIComponent(appSecret) + "&" + encodeURIComponent(accessTokenSecret);

  return signingKey;
}

//TODO : Create a function thats takes an URL to reach and return an object with
// Raw URL, and parameters (key/value)

function tryGetPriceGuide() {
  //Gathering all needed info (some will be function parameters with value hidden in a config file)
  const app_secret = "76tBmByr3luWVJAEp0yB0WBpnYnhmU2X";
  const access_token_secret = "0aG8CGgNcR47UwGs7cERd9iyilrdRFo2";

  const method = "GET";
  const URLToReach = "https://api.cardmarket.com/ws/v2.0/priceguide";
  const timestamp = Date.now();
  const nonce =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const appToken = "ImbvOWpgbnWN4qKA";
  const accessToken = "Cl2lfYbQr1KknVG2zIwkZLNbHE3sZWMF";

  //0. Prepare the header
  //1. Prepare the signature
  //2. Create the string header

  //0. Preparing Header

  //Table that will be used for the FINAL HEADER
  //CAUTION - Any query string parameter must be in that object too. They will be sorted alphabetically with the others.
  //CAUTION - Query parameters must be removed from URL that will be written in realm property.
  //So browse the URL, put any query string in props in the table, and let the link raw for realm
  const params = {
    realm: URLToReach,
    oauth_consumer_key: appToken,
    oauth_token: accessToken,
    oauth_nonce: nonce,
    oauth_timestamp: timestamp,
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
    oauth_signature: "",
  };

  //1. Preparing the signature

  //BaseString
  let baseString = method.toUpperCase() + "&";
  baseString += encodeURIComponent(URLToReach);

  const signatureParams = {
    oauth_consumer_key: appToken,
    oauth_token: accessToken,
    oauth_nonce: nonce,
    oauth_timestamp: timestamp,
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
  };

  //Sorting object properties alphabetically (MKM requires it)
  const params_ordered = {};
  Object.keys(signatureParams)
    .sort()
    .forEach(function (key) {
      params_ordered[key] = params[key];
    });

  //Encoding all params, and adding them to baseString

  for (const prop in params_ordered) {
    let keyValuePair = prop + "=" + params_ordered[prop];
    baseString = baseString + "&" + encodeURIComponent(keyValuePair);
  }

  const signingKey = calculateSigningKey(app_secret, access_token_secret);

  console.log(baseString);
  console.log(params_ordered);
  console.log(signingKey);

  //Temporary test of crypting, not working well, used StackOverFlow
  // const raw_signature = hmacSHA1(baseString, signingKey);
  // console.log(raw_signature);
  // console.log(typeof raw_signature);

  //Encrypting and encoding in base 64
  //Following https://stackoverflow.com/questions/35822552/hash-hmac-with-raw-binary-output-in-javascript
  var crypto = require("crypto");
  var buf1 = crypto.createHmac("sha1", "0").update(baseString).digest();
  var buf2 = Buffer.from(signingKey);
  console.log(Buffer.concat([buf1, buf2]).toString("base64"));
  const signature = Buffer.concat([buf1, buf2]).toString("base64");

  //Update signature in params_ordered
  params.oauth_signature = signature;

  //Prepare the Header
  let header = "Authorization: OAuth ";
  var i = 1;
  for (const prop in params) {
    if (i === 1) {
      let keyValuePair = prop + '="' + params[prop] + '"';
      header += keyValuePair;
    } else {
      let keyValuePair = ", " + prop + '="' + params[prop] + '"';
      header += keyValuePair;
    }
    i++;
  }
  console.log("header", header);

  return axios
    .get("https://api.cardmarket.com/ws/v2.0/priceguide", {
      headers: { authorization: header },
    })
    .then((data) => console.log(data))
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      }
      return console.log(error);
    });
}

function transformSellRequestIntoXML(sellRequest) {
  console.log(sellRequest);
  const xml_start = '<?xml version="1.0" encoding="UTF-8" ?><request>';
  const xml_end = "</request>";
  const xml_body = sellRequest.sellRequests.reduce(
    (accumulator, currentValue) => {
      const article =
        "<article> <idProduct>" +
        currentValue.mcmId +
        "</idProduct><idLanguage>" +
        currentValue.lang +
        "</idLanguage><comments>" +
        "" + //Optional comment to post
        "</comments><count>" +
        currentValue.quantity +
        "</count><price>" +
        setSellingMKMPrice(100) +
        "</price><condition>EX</condition><isFoil>" +
        currentValue.isFoil +
        "</isFoil><isSigned>" +
        currentValue.isSigned +
        "</isSigned><isPlayset>false</isPlayset></article>";

      return article + accumulator;
    },
    ""
  );
  const xml_to_send = xml_start + xml_body + xml_end;

  console.log(xml_to_send);

  return xml_to_send;
}

function MKM_AddToStock(XMLObject) {
  //PREPARE THE REQUEST TO SPLIT INTO SEVERAL - ONE FOR 100 OBJECTS
  return axios.post(URL_MKM_ADD_STOCK, XMLObject);
}

export default {
  URL_MKM_ADD_STOCK,
  URL_MKM_SANDBOX_ADD_STOCK,
  MKM_AddToStock,
  transformSellRequestIntoXML,
  tryGetPriceGuide,
};
