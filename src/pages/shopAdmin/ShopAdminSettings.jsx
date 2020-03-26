import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import Field from "../../components/forms/Field";
import { toast } from "react-toastify";
import shopAPI from "../../services/shopAPI";

//TODO : MAJ memoire vive

const ShopAdminSettings = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  // const [shopSettings, setShopSettings] = useState({
  //   baseLang: authenticationInfos.shop.shopData.baseLang,
  //   percentPerLang: authenticationInfos.shop.shopData.PercentPerLangs,
  //   percentPerCondition: authenticationInfos.shop.shopData.PercentPerConditions,
  //   percentPerConditionFoil:
  //     authenticationInfos.shop.shopData.PercentPerConditionFoils
  // });

  //We add a timer to not hit API at each user input.
  //This way there is at least WAIT_INTERVAL interval between each sending, or more if the user continues to input.
  const WAIT_INTERVAL = 1000;
  const [timer, setTimer] = useState(null);

  console.log(authenticationInfos);

  const updateState = (fieldModified, name, value) => {
    const authenticationInfosCopy = { ...authenticationInfos };
    switch (fieldModified) {
      case "percentPerLang":
        setAuthenticationInfos({
          ...authenticationInfos,
          shop: {
            ...authenticationInfos.shop,
            shopData: {
              ...authenticationInfos.shop.shopData,
              PercentPerLangs: {
                ...authenticationInfos.shop.shopData.PercentPerLangs,
                [name]: {
                  ...authenticationInfos.shop.shopData.PercentPerLangs[name],
                  percentPerLang: value
                }
              }
            }
          }
        });

        break;

      case "percentPerCondition":
        authenticationInfosCopy.shop.shopData.PercentPerConditions[
          name - 1
        ].percent = value;
        setAuthenticationInfos(authenticationInfosCopy);
        break;

      case "percentPerConditionFoil":
        authenticationInfosCopy.shop.shopData.PercentPerConditionFoils[
          name - 1
        ].percent = value;
        setAuthenticationInfos(authenticationInfosCopy);
        break;
    }
  };

  const triggerAPISending = () => {
    //construire l'objet a envoyer

    //building array of langs
    //building array of percentPerCondition
    //building array of percentPerConditionFoil

    const objectToSend = {
      percentPerLangs: [],
      percentPerCondition: [],
      percentPerConditionFoils: []
    };

    // shopAPI.updatePercentPer(authenticationInfos.shop.id, objectToSend);
    console.log("je bombarde l'api lol");
  };

  const handleChange = (event, fieldModified) => {
    setTimer(clearTimeout(timer));
    var { name, value } = event.target;

    if (event.target.value[event.target.value.length - 1] === ".") {
      updateState(fieldModified, name, value);
    } else if (!isNaN(parseFloat(event.target.value))) {
      value = parseFloat(value);
      updateState(fieldModified, name, value);
      setTimer(setTimeout(() => triggerAPISending(), WAIT_INTERVAL));
    } else if (event.target.value === "") {
      //We don't update on API to not create an empty field. We wait for another input to PUT.
      updateState(fieldModified, name, value);
      toast.error(
        "Un nombre est obligatoire pour chaque langue et condition. Merci d'en indiquer un."
      );
    } else {
      toast.error("Merci de saisir un nombre.");
    }

    //TODO :
    //5. update API
  };

  return (
    <>
      <div className="container">
        <h1>Paramètres</h1>
        <p>La langue par defaut du site : ENV_VARIABLE</p>
        <p>
          Quel est votre langue d'achat par défaut ? (select parmi toutes les
          langues de magic)
        </p>
        <select name="" id="">
          <option>
            {authenticationInfos.shop.shopData.baseLang.shortname}
          </option>
        </select>
        <p>Votre système de grading prédéfni : ENV_VARIABLE</p>

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
                    value={
                      authenticationInfos.shop.shopData.PercentPerLangs[lang.id]
                        .percentPerLang
                    }
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
                      authenticationInfos.shop.shopData.PercentPerConditions[
                        condition.id - 1
                      ].percent
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
                      authenticationInfos.shop.shopData
                        .PercentPerConditionFoils[condition.id - 1].percent
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
