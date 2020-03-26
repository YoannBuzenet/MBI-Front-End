import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";

const ShopAdminSettings = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

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
              <label htmlFor="englishPercent">Anglais</label>
              <input
                type="text"
                name={ENGLISH_LANG_ID}
                id="englishPercent"
                value={
                  shopSettings.percentPerLang[ENGLISH_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="frenchPercent">Français</label>
              <input
                type="text"
                name={FRENCH_LANG_ID}
                id="frenchPercent"
                value={
                  shopSettings.percentPerLang[FRENCH_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="germanPercent">Allemand</label>
              <input
                type="text"
                name={GERMAN_LANG_ID}
                id="germanPercent"
                value={
                  shopSettings.percentPerLang[GERMAN_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="spanishPercent">Espagnol</label>
              <input
                type="text"
                name={SPANISH_LANG_ID}
                id="spanishPercent"
                value={
                  shopSettings.percentPerLang[SPANISH_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="italianPercent">Italien</label>
              <input
                type="text"
                name={ITALIAN_LANG_ID}
                id="italianPercent"
                value={
                  shopSettings.percentPerLang[ITALIAN_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="portuguesePercent">Portuguais</label>
              <input
                type="text"
                name={PORTUGUESE_LANG_ID}
                id="portuguesePercent"
                value={
                  shopSettings.percentPerLang[PORTUGUESE_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="japanesePercent">Japonais</label>
              <input
                type="text"
                name={JAPANESE_LANG_ID}
                id="japanesePercent"
                value={
                  shopSettings.percentPerLang[JAPANESE_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="chineseTraditionalPercent">
                Chinois Traditionnel
              </label>
              <input
                type="text"
                name={CHINESE_TRADITIONAL_LANG_ID}
                id="chineseTraditionalPercent"
                value={
                  shopSettings.percentPerLang[CHINESE_TRADITIONAL_LANG_ID]
                    .percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="chineseSimplifiedPercent">
                Chinois Simplifié
              </label>
              <input
                type="text"
                name={CHINESE_SIMPLIFIED_LANG_ID}
                id="chineseSimplifiedPercent"
                value={
                  shopSettings.percentPerLang[CHINESE_SIMPLIFIED_LANG_ID]
                    .percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="koreanPercent">Coréen</label>
              <input
                type="text"
                name={KOREAN_LANG_ID}
                id="koreanPercent"
                value={
                  shopSettings.percentPerLang[KOREAN_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
              <label htmlFor="russianPercent">Russe</label>
              <input
                type="text"
                name={RUSSIAN_LANG_ID}
                id="russianPercent"
                value={
                  shopSettings.percentPerLang[RUSSIAN_LANG_ID].percentPerLang
                }
                onChange={event => handleChangePercentPerLang(event)}
              />
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
