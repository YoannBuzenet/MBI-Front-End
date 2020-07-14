import React, { useContext, useState } from "react";
import ShopOneLangAllConditionsCard from "./ShopOneLangAllConditionsCard";
import priceBufferContext from "../../context/priceBufferContext";
import config from "../../services/config";
import cardsAPI from "../../services/cardsAPI";
import { FormattedMessage } from "react-intl";

const ShopSetLangCards = ({ card, index }) => {
  //Context - building the memoization of all condition/lang possibilities
  const { allPricesBuffer } = useContext(priceBufferContext);

  const Fragment = React.Fragment;

  console.log(card);

  return (
    <>
      <div className="one-set">
        <h2>{allPricesBuffer[index].edition.name}</h2>
        <div className="priceUpdate-cardInfos">
          <div className="shopCardInfoRecap">
            <div className="picture">
              <img src={cardsAPI.getSmallPictureFromScryfallId(card)} alt="" />
            </div>
            <div className="allPrices">
              <div className="regularPrices">
                <h2>Regular</h2>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.mkmPriceName.regularMediumPrice"
                      defaultMessage={`Average Sell Price`}
                    />
                  </span>
                  <span>{card?.priceguide?.AvgSellPrice}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.averageRegularSellPriceOnOneDay"
                      defaultMessage={`Average on one day : `}
                    />
                  </span>
                  <span>{card?.priceguide?.avg1}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.averageRegularSellPriceOnSevenDay"
                      defaultMessage={`Average on 7 days : `}
                    />
                  </span>
                  <span>{card?.priceguide?.avg7}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.averageRegularSellPriceOnThirtyDay"
                      defaultMessage={`Average on 30 days : `}
                    />
                  </span>
                  <span>{card?.priceguide?.avg30}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.regularGermanLowPrice"
                      defaultMessage={`German Low Price : `}
                    />
                  </span>
                  <span>{card?.priceguide?.germanProLow}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.regularLowPrice"
                      defaultMessage={`Low Price : `}
                    />
                  </span>
                  <span>{card?.priceguide?.lowPrice}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.regularExcPrice"
                      defaultMessage={`Low Price Exc : `}
                    />
                  </span>
                  <span>{card?.priceguide?.lowPriceEx}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.suggestedSalePrice"
                      defaultMessage={`Suggested Sell Price : `}
                    />
                  </span>
                  <span>{card?.priceguide?.suggestedPrice}</span>
                </div>
              </div>
              {/* <div className="onePrice">
                <span>Tendance : </span>
                <span>{card?.priceguide?.trendPrice}</span>
              </div> */}
              <div className="foilPrices">
                <h2>Foil</h2>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.foilMediumPrice"
                      defaultMessage={`Foil Average Sell Price : `}
                    />
                  </span>
                  <span>{card?.priceguide?.foilSell}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.averageFoilSellPriceOnOneDay"
                      defaultMessage={`Foil Average on One day :  `}
                    />
                  </span>
                  <span>{card?.priceguide?.foilAvg1}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.averageFoilSellPriceOnSevenDay"
                      defaultMessage={`Foil Average on 7 days :  `}
                    />
                  </span>
                  <span>{card?.priceguide?.foilAvg7}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.averageFoilSellPriceOnThirtyDay"
                      defaultMessage={`Foil Average on 30 days : `}
                    />
                  </span>
                  <span>{card?.priceguide?.foilAvg30}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.foilLowPrice"
                      defaultMessage={`Foil Low Price : `}
                    />
                  </span>
                  <span>{card?.priceguide?.foilLow}</span>
                </div>
                <div className="onePrice">
                  <span>
                    <FormattedMessage
                      id="app.shop.priceFormUpdate.mkmPriceName.averageFoilTrend"
                      defaultMessage={`Foil Price Trend : `}
                    />
                  </span>
                  <span>{card?.priceguide?.foilTrend}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="hrAfterPrices" />

        {/* integrate English in the lang array, and then put the BaseLang on top by filtering arrays */}
        {[
          {
            name: card.name,
            language_id: { id: 9, name: "English", shortname: "EN" },
          },
        ]
          .concat(card.foreignData)
          .filter(
            (currentLang) =>
              currentLang.language_id.id ===
              parseInt(process.env.REACT_APP_SHOP_BASELANG)
          )
          .concat(
            [
              {
                name: card.name,
                language_id: { id: 9, name: "English", shortname: "EN" },
              },
            ].filter(
              (currentLang) =>
                currentLang.language_id.id !==
                parseInt(process.env.REACT_APP_SHOP_BASELANG)
            )
          )
          .concat(
            card.foreignData.filter(
              (currentLang) =>
                currentLang.language_id.id !==
                parseInt(process.env.REACT_APP_SHOP_BASELANG)
            )
          )

          .map((oneLang) => {
            return (
              <Fragment key={oneLang.language_id.id}>
                <h3>
                  {oneLang.language_id.name}
                  <span className="price-update-flag-lang">
                    <img
                      src={
                        "/flags/25X13/" + oneLang.language_id.shortname + ".png"
                      }
                      alt=""
                    />
                  </span>
                </h3>
                <ShopOneLangAllConditionsCard
                  oneLang={oneLang}
                  index={index}
                  card={card}
                />
              </Fragment>
            );
          })}
      </div>{" "}
    </>
  );
};

export default ShopSetLangCards;
