import React from "react";

const ShopAdminSettings = props => {
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
              <input type="text" name="englishPercent" id="englishPercent" />
              <label htmlFor="frenchPercent">Français</label>
              <input type="text" name="frenchPercent" id="frenchPercent" />
              <label htmlFor="germanPercent">Allemand</label>
              <input type="text" name="germanPercent" id="germanPercent" />
              <label htmlFor="spanishPercent">Espagnol</label>
              <input type="text" name="spanishPercent" id="spanishPercent" />
              <label htmlFor="italianPercent">Italien</label>
              <input type="text" name="italianPercent" id="italianPercent" />
              <label htmlFor="portuguesePercent">Portuguais</label>
              <input
                type="text"
                name="portuguesePercent"
                id="portuguesePercent"
              />
              <label htmlFor="japanesePercent">Japonais</label>
              <input type="text" name="japanesePercent" id="japanesePercent" />
              <label htmlFor="chineseTraditionalPercent">
                Chinois Traditionnel
              </label>
              <input
                type="text"
                name="chineseTraditionalPercent"
                id="chineseTraditionalPercent"
              />
              <label htmlFor="chineseSimplifiedPercent">
                Chinois Simplifié
              </label>
              <input
                type="text"
                name="chineseSimplifiedPercent"
                id="chineseSimplifiedPercent"
              />
              <label htmlFor="koreanPercent">Coréen</label>
              <input type="text" name="koreanPercent" id="koreanPercent" />
              <label htmlFor="russianPercent">Russe</label>
              <input type="text" name="russianPercent" id="russianPercent" />
            </form>
          </div>
          <div className="percentPerConditions">
            <h2>Conditions</h2>
            <form>
              <label htmlFor="mintCondition">Mint</label>
              <input type="text" name="mintCondition" id="mintCondition" />
              <label htmlFor="nearMintCondition">Near Mint</label>
              <input
                type="text"
                name="nearMintCondition"
                id="nearMintCondition"
              />
              <label htmlFor="goodCondition">Good</label>
              <input type="text" name="goodCondition" id="goodCondition" />
              <label htmlFor="lightPlayedCondition">Light Played</label>
              <input
                type="text"
                name="lightPlayedCondition"
                id="lightPlayedCondition"
              />
              <label htmlFor="playedCondition">Played</label>
              <input type="text" name="playedCondition" id="playedCondition" />
              <label htmlFor="poorCondition">Poor</label>
              <input type="text" name="poorCondition" id="poorCondition" />
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
              />
              <label htmlFor="nearMintFoil">Near Mint Foil</label>
              <input type="text" name="nearMintFoil" id="nearMintFoil" />
              <label htmlFor="goodFoilCondition">Good</label>
              <input
                type="text"
                name="goodFoilCondition"
                id="goodFoilCondition"
              />
              <label htmlFor="lightPlayedFoilCondition">Light Played</label>
              <input
                type="text"
                name="lightPlayedFoilCondition"
                id="lightPlayedFoilCondition"
              />
              <label htmlFor="playedFoilCondition">Played</label>
              <input
                type="text"
                name="playedFoilCondition"
                id="playedFoilCondition"
              />
              <label htmlFor="poorFoilCondition">Poor</label>
              <input
                type="text"
                name="poorFoilCondition"
                id="poorFoilCondition"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAdminSettings;
