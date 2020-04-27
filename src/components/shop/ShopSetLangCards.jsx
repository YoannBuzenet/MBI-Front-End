import React, { useContext, useState } from "react";
import ShopOneLangAllConditionsCard from "./ShopOneLangAllConditionsCard";
import priceBufferContext from "../../context/priceBufferContext";
import config from "../../services/config";
import cardsAPI from "../../services/cardsAPI";

const ShopSetLangCards = ({ card, index }) => {
  //Context - building the memoization of all condition/lang possibilities
  const { allPricesBuffer } = useContext(priceBufferContext);

  const [isHover, setIsHover] = useState(false);

  const Fragment = React.Fragment;

  console.log(card);

  return (
    <>
      <div className="one-set">
        <img src={cardsAPI.getSmallPictureFromScryfallId(card)} alt="" />
        <h2
        // onMouseEnter={(event) => {
        //   setIsHover(true);
        // }}
        // onMouseLeave={(event) => {
        //   setIsHover(false);
        // }}
        >
          {allPricesBuffer[index].edition.name}
        </h2>
        {/* integrate English in the lang array, and then put the BaseLang on top by filtering arrays */}
        {[
          {
            name: card.name,
            language_id: { id: 9, name: "English", shortname: "EN" },
          },
        ]
          .concat(card.foreignData)
          .filter(
            (currentLang) => currentLang.language_id.id === config.baseLang
          )
          .concat(
            [
              {
                name: card.name,
                language_id: { id: 9, name: "English", shortname: "EN" },
              },
            ].filter(
              (currentLang) => currentLang.language_id.id !== config.baseLang
            )
          )
          .concat(
            card.foreignData.filter(
              (currentLang) => currentLang.language_id.id !== config.baseLang
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
