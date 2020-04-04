import axios from "axios";
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

function tryGetPriceGuide() {
  const app_secret = "76tBmByr3luWVJAEp0yB0WBpnYnhmU2X";
  const access_token_secret = "Cl2lfYbQr1KknVG2zIwkZLNbHE3sZWMF";

  const realm = "https://api.cardmarket.com/ws/v1.1/account";
  const oauth_version = "1.0";
  const oauth_timestamp = Date.now();
  const oauth_nonce =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const oauth_consumer_key = "ImbvOWpgbnWN4qKA"; //App Token
  const oauth_token = "Cl2lfYbQr1KknVG2zIwkZLNbHE3sZWMF"; //Access Token
  const oauth_signature_method = "HMAC-SHA1";

  var oauth_signature;

  var header;

  console.log(oauth_nonce);
  console.log(oauth_timestamp);
  console.log(calculateSigningKey(app_secret, access_token_secret));

  console.log("beu");

  return axios.get("https://api.cardmarket.com/ws/v1.1/account");
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
