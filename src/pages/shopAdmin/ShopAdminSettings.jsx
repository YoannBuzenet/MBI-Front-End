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
        <p>
          Quel %age du prix d'achat de la langue par defaut voulez-vous donner
          aux autres langues ? tableau avec toutes les autres langues et un
          nombre à rentrer entre 0 et 100%
        </p>
        <div className="percentPerLang">
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
            <label htmlFor="chineseSimplifiedPercent">Chinois Simplifié</label>
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
      </div>
    </>
  );
};

export default ShopAdminSettings;
