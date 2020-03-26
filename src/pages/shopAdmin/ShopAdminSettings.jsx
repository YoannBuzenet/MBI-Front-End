import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import Field from "../../components/forms/Field";

const ShopAdminSettings = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  const [shopSettings, setShopSettings] = useState({
    baseLang: authenticationInfos.shop.shopData.baseLang,
    percentPerLang: authenticationInfos.shop.shopData.PercentPerLangs,
    percentPerCondition: authenticationInfos.shop.shopData.PercentPerConditions,
    percentPerConditionFoil:
      authenticationInfos.shop.shopData.PercentPerConditionFoils
  });

  //All languages ID in the object received from the API
  const GERMAN_LANG_ID = 1;
  const SPANISH_LANG_ID = 2;
  const FRENCH_LANG_ID = 3;
  const ITALIAN_LANG_ID = 4;
  const JAPANESE_LANG_ID = 5;
  const PORTUGUESE_LANG_ID = 6;
  const RUSSIAN_LANG_ID = 7;
  const CHINESE_SIMPLIFIED_LANG_ID = 8;
  const ENGLISH_LANG_ID = 9;
  const KOREAN_LANG_ID = 10;
  const CHINESE_TRADITIONAL_LANG_ID = 11;

  //all conditions positions in the array received from the API
  //American grading is precised in 2nd position when name differs from European.
  const COND_MINT_INDEX = 0;
  const COND_NEAR_MINT_INDEX = 1;
  const COND_EXCELLENT_SP_INDEX = 2;
  const COND_GOOD_MP_INDEX = 3;
  const COND_LP_INDEX = 4;
  const COND_PLAYED_HP_INDEX = 5;
  const COND_POOR_D_INDEX = 6;
  console.log(authenticationInfos);
  console.log(shopSettings);

  const handleChangePercentPerLang = () => {
    console.log("percentPerLang changement");
  };

  const handleChangePercentPerCondition = () => {
    console.log("PercentPerCondition changement");
  };

  const handleChangePercentPerConditionFoil = () => {
    console.log("PercentPerCondition FOIL changement");
  };

  const handleChange = (event, fieldModified) => {
    switch (fieldModified) {
      case "percentPerLang":
        console.log("percentPerLang changement");

        break;
      case "percentPerCondition":
        console.log("percentPerCondition changement");
        break;
      case "percentPerConditionFoil":
        console.log("percentPerConditionFoil changement");
        break;
    }
  };

  return (
    <>
      <div className="container">
        <h1>Paramètres</h1>
        <p>
          Quel est la langue de votre site, par défaut ? (select parmi les
          possibilités djéà implémentées)
        </p>
        <p>
          Quel est votre langue d'achat par défaut ? (select parmi toutes les
          langues de magic)
        </p>
        <select name="" id="">
          <option>{shopSettings.baseLang.shortname}</option>
        </select>
        <p>
          Quel est votre système de grading ? US, ou EU ? (radio l'un ou
          l'autre)
        </p>
        <p>Quel format de date préférez-vous ? dd/mm/yy ou mm/dd/yy ?</p>

        <div className="percentSettings">
          <div className="percentPerLang">
            <h2>Langues</h2>
            <span className="explaination">
              Quel pourcentage voulez-vous appliquer aux langues ? Votre langue
              d'achat préférée est le repère, elle doit être à 100%.
            </span>
            <form>
              {lang.length > 0 &&
                lang.map(lang => (
                  <Field
                    name={lang.id}
                    label={lang.name}
                    value={shopSettings.percentPerLang[lang.id].percentPerLang}
                    onChange={event => handleChange(event, "percentPerLang")}
                    placeholder="Pourcentage d'achat de la langue"
                    key={lang.id}
                  />
                ))}
            </form>
          </div>
          <div className="percentPerConditions">
            <h2>Conditions</h2>
            <form>
              <label htmlFor="mintCondition">Mint</label>
              <input
                type="text"
                name={COND_MINT_INDEX}
                id="mintCondition"
                value={
                  shopSettings.percentPerCondition[COND_MINT_INDEX].percent
                }
                onChange={event => handleChangePercentPerCondition(event)}
              />
              <label htmlFor="nearMintCondition">Near Mint</label>
              <input
                type="text"
                name={COND_NEAR_MINT_INDEX}
                id="nearMintCondition"
                value={
                  shopSettings.percentPerCondition[COND_NEAR_MINT_INDEX].percent
                }
                onChange={event => handleChangePercentPerCondition(event)}
              />
              <label htmlFor="nearMintCondition">Excellent</label>
              {/* Excellent/Slighty Played */}
              <input
                type="text"
                name={COND_EXCELLENT_SP_INDEX}
                id="excellentCondition"
                value={
                  shopSettings.percentPerCondition[COND_EXCELLENT_SP_INDEX]
                    .percent
                }
                onChange={event => handleChangePercentPerCondition(event)}
              />
              <label htmlFor="goodCondition">Good</label>
              {/* Good/Moderately Played */}
              <input
                type="text"
                name={COND_GOOD_MP_INDEX}
                id="goodCondition"
                value={
                  shopSettings.percentPerCondition[COND_GOOD_MP_INDEX].percent
                }
                onChange={event => handleChangePercentPerCondition(event)}
              />
              <label htmlFor="lightPlayedCondition">Light Played</label>
              <input
                type="text"
                name={COND_LP_INDEX}
                id="lightPlayedCondition"
                value={shopSettings.percentPerCondition[COND_LP_INDEX].percent}
                onChange={event => handleChangePercentPerCondition(event)}
              />

              <label htmlFor="playedCondition">Played</label>
              {/* Played/Heavily Played */}
              <input
                type="text"
                name={COND_PLAYED_HP_INDEX}
                id="playedCondition"
                value={
                  shopSettings.percentPerCondition[COND_PLAYED_HP_INDEX].percent
                }
                onChange={event => handleChangePercentPerCondition(event)}
              />
              <label htmlFor="poorCondition">Poor</label>
              {/* Poor/Damaged */}
              <input
                type="text"
                name={COND_POOR_D_INDEX}
                id="poorCondition"
                value={
                  shopSettings.percentPerCondition[COND_POOR_D_INDEX].percent
                }
                onChange={event => handleChangePercentPerCondition(event)}
              />
            </form>
          </div>
          <div className="percentPerConditionsFoil">
            <h2>Conditions Foil</h2>
            <form>
              <label htmlFor="mintFoilCondition">Mint Foil</label>
              <input
                type="text"
                name={COND_MINT_INDEX}
                id="mintFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_MINT_INDEX].percent
                }
                onChange={event => handleChangePercentPerConditionFoil(event)}
              />
              <label htmlFor="nearMintFoil">Near Mint Foil</label>
              <input
                type="text"
                name={COND_NEAR_MINT_INDEX}
                id="nearMintFoil"
                value={
                  shopSettings.percentPerConditionFoil[COND_NEAR_MINT_INDEX]
                    .percent
                }
                onChange={event => handleChangePercentPerConditionFoil(event)}
              />
              <label htmlFor="excellentFoil">Excellent Foil</label>
              <input
                type="text"
                name={COND_EXCELLENT_SP_INDEX}
                id="excellentFoil"
                value={
                  shopSettings.percentPerConditionFoil[COND_EXCELLENT_SP_INDEX]
                    .percent
                }
                onChange={event => handleChangePercentPerConditionFoil(event)}
              />
              <label htmlFor="goodFoilCondition">Good</label>
              <input
                type="text"
                name={COND_GOOD_MP_INDEX}
                id="goodFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_GOOD_MP_INDEX]
                    .percent
                }
                onChange={event => handleChangePercentPerConditionFoil(event)}
              />
              <label htmlFor="lightPlayedFoilCondition">Light Played</label>
              <input
                type="text"
                name={COND_LP_INDEX}
                id="lightPlayedFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_LP_INDEX].percent
                }
                onChange={event => handleChangePercentPerConditionFoil(event)}
              />
              <label htmlFor="playedFoilCondition">Played</label>
              <input
                type="text"
                name={COND_PLAYED_HP_INDEX}
                id="playedFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_PLAYED_HP_INDEX]
                    .percent
                }
                onChange={event => handleChangePercentPerConditionFoil(event)}
              />
              <label htmlFor="poorFoilCondition">Poor</label>
              <input
                type="text"
                name={COND_POOR_D_INDEX}
                id="poorFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_POOR_D_INDEX]
                    .percent
                }
                onChange={event => handleChangePercentPerConditionFoil(event)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAdminSettings;
