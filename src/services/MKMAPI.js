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

function transformSellRequestIntoXML(sellRequest) {
  console.log(sellRequest);

  return sellRequest;
}

function MKM_Add(XMLObject) {
  //PREPARE THE REQUEST TO SPLIT INTO SEVERAL - ONE FOR 100 OBJECTS
  return axios.post(URL_MKM_ADD_STOCK, XMLObject);
}

export default {
  URL_MKM_ADD_STOCK,
  MKM_Add,
  transformSellRequestIntoXML
};
