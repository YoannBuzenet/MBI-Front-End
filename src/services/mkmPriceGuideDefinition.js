// Key is the MKM id of the priceguide, used on on central API
// Value is the corresponding translation in /translations/{language}.json

//Removed this algo because data is often missing
//foilSell: "app.shop.priceFormUpdate.mkmPriceName.foilMediumPrice",

const allPricesAvailableOnMKM = {
  AvgSellPrice: "app.shop.priceFormUpdate.mkmPriceName.regularMediumPrice",
  avg1: "app.shop.priceFormUpdate.mkmPriceName.averageRegularSellPriceOnOneDay",
  avg7:
    "app.shop.priceFormUpdate.mkmPriceName.averageRegularSellPriceOnSevenDay",
  avg30:
    "app.shop.priceFormUpdate.mkmPriceName.averageRegularSellPriceOnThirtyDay",
  trendPrice: "app.shop.priceFormUpdate.mkmPriceName.averageRegularTrend",
  germanProLow: "app.shop.priceFormUpdate.mkmPriceName.regularGermanLowPrice",
  lowPrice: "app.shop.priceFormUpdate.mkmPriceName.regularLowPrice",
  lowPriceEx: "app.shop.priceFormUpdate.mkmPriceName.regularExcPrice",
  suggestedPrice: "app.shop.priceFormUpdate.mkmPriceName.suggestedSalePrice",
  foilAvg1:
    "app.shop.priceFormUpdate.mkmPriceName.averageFoilSellPriceOnOneDay",
  foilAvg7:
    "app.shop.priceFormUpdate.mkmPriceName.averageFoilSellPriceOnSevenDay",
  foilAvg30:
    "app.shop.priceFormUpdate.mkmPriceName.averageFoilSellPriceOnThirtyDay",
  foilLow: "app.shop.priceFormUpdate.mkmPriceName.foilLowPrice",
  foilTrend: "app.shop.priceFormUpdate.mkmPriceName.averageFoilTrend",
};

module.exports = { allPricesAvailableOnMKM };
