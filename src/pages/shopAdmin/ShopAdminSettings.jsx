import React from "react";

const ShopAdminSettings = props => {
  return (
    <>
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
        Quel est votre système de grading ? US, ou EU ? (radio l'un ou l'autre)
      </p>
      <p>Quel format de date préférez-vous ? dd/mm/yy ou mm/dd/yy ?</p>
      <p>
        Quel %age du prix d'achat de la langue par defaut voulez-vous donner aux
        autres langues ? tableau avec toutes les autres langues et un nombre à
        rentrer entre 0 et 100%
      </p>
    </>
  );
};

export default ShopAdminSettings;
