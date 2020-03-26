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
                name="englishPercent"
                id="englishPercent"
                value={
                  shopSettings.percentPerLang[ENGLISH_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="frenchPercent">Français</label>
              <input
                type="text"
                name="frenchPercent"
                id="frenchPercent"
                value={
                  shopSettings.percentPerLang[FRENCH_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="germanPercent">Allemand</label>
              <input
                type="text"
                name="germanPercent"
                id="germanPercent"
                value={
                  shopSettings.percentPerLang[GERMAN_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="spanishPercent">Espagnol</label>
              <input
                type="text"
                name="spanishPercent"
                id="spanishPercent"
                value={
                  shopSettings.percentPerLang[SPANISH_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="italianPercent">Italien</label>
              <input
                type="text"
                name="italianPercent"
                id="italianPercent"
                value={
                  shopSettings.percentPerLang[ITALIAN_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="portuguesePercent">Portuguais</label>
              <input
                type="text"
                name="portuguesePercent"
                id="portuguesePercent"
                value={
                  shopSettings.percentPerLang[PORTUGUESE_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="japanesePercent">Japonais</label>
              <input
                type="text"
                name="japanesePercent"
                id="japanesePercent"
                value={
                  shopSettings.percentPerLang[JAPANESE_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="chineseTraditionalPercent">
                Chinois Traditionnel
              </label>
              <input
                type="text"
                name="chineseTraditionalPercent"
                id="chineseTraditionalPercent"
                value={
                  shopSettings.percentPerLang[CHINESE_TRADITIONAL_LANG_ID]
                    .percentPerLang
                }
              />
              <label htmlFor="chineseSimplifiedPercent">
                Chinois Simplifié
              </label>
              <input
                type="text"
                name="chineseSimplifiedPercent"
                id="chineseSimplifiedPercent"
                value={
                  shopSettings.percentPerLang[CHINESE_SIMPLIFIED_LANG_ID]
                    .percentPerLang
                }
              />
              <label htmlFor="koreanPercent">Coréen</label>
              <input
                type="text"
                name="koreanPercent"
                id="koreanPercent"
                value={
                  shopSettings.percentPerLang[KOREAN_LANG_ID].percentPerLang
                }
              />
              <label htmlFor="russianPercent">Russe</label>
              <input
                type="text"
                name="russianPercent"
                id="russianPercent"
                value={
                  shopSettings.percentPerLang[RUSSIAN_LANG_ID].percentPerLang
                }
              />
            </form>
          </div>
          <div className="percentPerConditions">
            <h2>Conditions</h2>
            <form>
              <label htmlFor="mintCondition">Mint</label>
              <input
                type="text"
                name="mintCondition"
                id="mintCondition"
                value={
                  shopSettings.percentPerCondition[COND_MINT_INDEX].percent
                }
              />
              <label htmlFor="nearMintCondition">Near Mint</label>
              <input
                type="text"
                name="nearMintCondition"
                id="nearMintCondition"
                value={
                  shopSettings.percentPerCondition[COND_NEAR_MINT_INDEX].percent
                }
              />
              <label htmlFor="nearMintCondition">Excellent</label>
              {/* Excellent/Slighty Played */}
              <input
                type="text"
                name="excellentCondition"
                id="excellentCondition"
                value={
                  shopSettings.percentPerCondition[COND_EXCELLENT_SP_INDEX]
                    .percent
                }
              />
              <label htmlFor="goodCondition">Good</label>
              {/* Good/Moderately Played */}
              <input
                type="text"
                name="goodCondition"
                id="goodCondition"
                value={
                  shopSettings.percentPerCondition[COND_GOOD_MP_INDEX].percent
                }
              />
              <label htmlFor="lightPlayedCondition">Light Played</label>
              <input
                type="text"
                name="lightPlayedCondition"
                id="lightPlayedCondition"
                value={shopSettings.percentPerCondition[COND_LP_INDEX].percent}
              />
              <label htmlFor="playedCondition">Played</label>
              {/* Played/Heavily Played */}
              <input
                type="text"
                name="playedCondition"
                id="playedCondition"
                value={
                  shopSettings.percentPerCondition[COND_PLAYED_HP_INDEX].percent
                }
              />
              <label htmlFor="poorCondition">Poor</label>
              {/* Poor/Damaged */}
              <input
                type="text"
                name="poorCondition"
                id="poorCondition"
                value={
                  shopSettings.percentPerCondition[COND_POOR_D_INDEX].percent
                }
              />
            </form>
          </div>
          <div className="percentPerConditionsFoil">
            <h2>Conditions Foil</h2>
            <form>
              <label htmlFor="mintFoilCondition">Mint Foil</label>
              <input
                type="text"
                name="mintFoilCondition"
                id="mintFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_MINT_INDEX].percent
                }
              />
              <label htmlFor="nearMintFoil">Near Mint Foil</label>
              <input
                type="text"
                name="nearMintFoil"
                id="nearMintFoil"
                value={
                  shopSettings.percentPerConditionFoil[COND_NEAR_MINT_INDEX]
                    .percent
                }
              />
              <label htmlFor="excellentFoil">Excellent Foil</label>
              <input
                type="text"
                name="excellentFoil"
                id="excellentFoil"
                value={
                  shopSettings.percentPerConditionFoil[COND_EXCELLENT_SP_INDEX]
                    .percent
                }
              />
              <label htmlFor="goodFoilCondition">Good</label>
              <input
                type="text"
                name="goodFoilCondition"
                id="goodFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_GOOD_MP_INDEX]
                    .percent
                }
              />
              <label htmlFor="lightPlayedFoilCondition">Light Played</label>
              <input
                type="text"
                name="lightPlayedFoilCondition"
                id="lightPlayedFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_LP_INDEX].percent
                }
              />
              <label htmlFor="playedFoilCondition">Played</label>
              <input
                type="text"
                name="playedFoilCondition"
                id="playedFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_PLAYED_HP_INDEX]
                    .percent
                }
              />
              <label htmlFor="poorFoilCondition">Poor</label>
              <input
                type="text"
                name="poorFoilCondition"
                id="poorFoilCondition"
                value={
                  shopSettings.percentPerConditionFoil[COND_POOR_D_INDEX]
                    .percent
                }
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAdminSettings;
