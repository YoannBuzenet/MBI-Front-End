import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import Field from "../../components/forms/Field";
import { toast } from "react-toastify";

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

  console.log(authenticationInfos);
  console.log(shopSettings);

  const handleChange = (event, fieldModified) => {
    const shopSettingsCopy = { ...shopSettings };
    const { name, value } = event.target;

    if (event.target.value[event.target.value.length - 1] === ".") {
    } else if (!isNaN(parseFloat(event.target.value))) {
    } else if (event.target.value === "") {
    } else {
      toast.error("Merci de saisir un nombre.");
    }

    //TODO :
    //1. Check l'input si que des chiffres
    //2.Toastify si erreur input
    //3. update la mémoire vive
    //4. update local storage
    //5. update API

    switch (fieldModified) {
      case "percentPerLang":
        setShopSettings({
          ...shopSettings,
          percentPerLang: {
            ...shopSettings.percentPerLang,
            [name]: {
              ...shopSettings.percentPerLang[name],
              percentPerLang: value
            }
          }
        });

        break;

      case "percentPerCondition":
        shopSettingsCopy.percentPerCondition[name - 1].percent = value;
        setShopSettings(shopSettingsCopy);
        break;

      case "percentPerConditionFoil":
        shopSettingsCopy.percentPerConditionFoil[name - 1].percent = value;
        setShopSettings(shopSettingsCopy);
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
                lang.map((lang, index) => (
                  <Field
                    name={lang.id}
                    label={lang.name}
                    value={shopSettings.percentPerLang[lang.id].percentPerLang}
                    onChange={event => handleChange(event, "percentPerLang")}
                    placeholder="Pourcentage d'achat de la langue"
                    key={lang.id + index}
                    idNumber={Math.random()}
                  />
                ))}
            </form>
          </div>
          <div className="percentPerConditions">
            <h2>Conditions</h2>
            <form>
              {conditions.length > 0 &&
                conditions.map((condition, index) => (
                  <Field
                    name={condition.id}
                    label={condition.nameEU}
                    value={
                      shopSettings.percentPerCondition[condition.id - 1].percent
                    }
                    onChange={event =>
                      handleChange(event, "percentPerCondition")
                    }
                    placeholder="Pourcentage d'achat de la condition"
                    key={condition.id + index}
                    idNumber={Math.random()}
                  />
                ))}
            </form>
          </div>
          <div className="percentPerConditionsFoil">
            <h2>Conditions Foil</h2>
            <form>
              {conditions.length > 0 &&
                conditions.map((condition, index) => (
                  <Field
                    name={condition.id}
                    label={condition.nameEU + " Foil"}
                    value={
                      shopSettings.percentPerConditionFoil[condition.id - 1]
                        .percent
                    }
                    onChange={event =>
                      handleChange(event, "percentPerConditionFoil")
                    }
                    placeholder="Pourcentage d'achat de la condition en Foil"
                    key={condition.id + index}
                    idNumber={Math.random()}
                  />
                ))}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAdminSettings;
