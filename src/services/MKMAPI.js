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

function transformSellRequestIntoXML(sellRequest) {
  console.log(sellRequest);
  const xml_start = '<?xml version="1.0" encoding="UTF-8" ?><request>';
  const xml_end = "</request>";
  const xml_body = sellRequest.sellRequests.reduce(
    (accumulator, currentValue) => {
      const article =
        "<article> <idProduct>100569</idProduct><idLanguage>1</idLanguage><comments>Inserted through the API</comments><count>1</count><price>4</price><condition>EX</condition><isFoil>true</isFoil><isSigned>false</isSigned><isPlayset>false</isPlayset></article>";

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
  transformSellRequestIntoXML
};
