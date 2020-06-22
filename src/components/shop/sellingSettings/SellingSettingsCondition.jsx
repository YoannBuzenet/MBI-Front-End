import React, { useContext, useState } from "react";
import AuthContext from "../../../context/authContext";
import config from "../../../services/config";
import { allPricesAvailableOnMKM } from "../../../services/mkmPriceGuideDefinition";
import { useIntl, FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

const SellingSettingsCondition = ({ isFoil, condition, lang }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [timer, setTimer] = useState(null);

  const WAIT_INTERVAL = 2000;

  //Aligning the boolean to the JSON
  isFoil = isFoil ? 1 : 0;
  console.log("line id", isFoil, condition, lang);
  console.log(authenticationInfos);

  //Hook Intl to translate an attribute
  const intl = useIntl();

  const conditionShortname =
    config.gradingArea === "EU" ? "shortname" : "shortnameUS";

  //If it's needed to get the condition complete name ("Near Mint")
  const conditionCompleteName = "shortname" + config.gradingArea;

  const handleChange = (event, lang, isFoil, condition) => {
    setTimer(clearTimeout(timer));
    console.log("input");
    const newContext = authenticationInfos.shop.shopData.SellingSettings;
    const newPrice = event.target.value;

    if (!isNaN(parseFloat(newPrice))) {
      if (condition.id === 1) {
        //If Mint condition is updated, we compute all condition of the current lang/isFoil
      } else {
        //If non Mint condition is updated, we don't change other prices
      }
      newContext[lang.id][condition.id][isFoil] = newPrice;
      setAuthenticationInfos({
        ...authenticationInfos,
        shop: {
          ...authenticationInfos.shop,
          shopData: {
            ...authenticationInfos.shop.shopData,
            SellingSettings: newContext,
          },
        },
      });
      setTimer(
        setTimeout(
          () => triggerAPISending(event, lang, condition, isFoil),
          WAIT_INTERVAL
        )
      );
    } else if (event.target.value === "") {
      newContext[lang.id][condition.id][isFoil] = 0;
      setAuthenticationInfos({
        ...authenticationInfos,
        shop: {
          ...authenticationInfos.shop,
          shopData: {
            ...authenticationInfos.shop.shopData,
            SellingSettings: newContext,
          },
        },
      });
      setTimer(
        setTimeout(
          () => triggerAPISending(event, lang.id, condition.id, isFoil),
          WAIT_INTERVAL
        )
      );
    } else {
      toast.error(
        <FormattedMessage
          id="app.shop.priceFormUpdate.inputNumer.toast.error"
          defaultMessage={`Please indicate a number.`}
        />
      );
    }
  };

  const triggerAPISending = (event, langID, conditionID, isFoil) => {
    //MAJ l'objet sur Express : json.stringify it and send it to Express
    //Pas besoin de traitement granulaire comme sur ShopPriceCondition
    //Juste traiter le fichier et l'envoyer
    console.log("sending to Express !");
    const StringifiedContext = JSON.stringify(
      authenticationInfos.shop.ShopData.SellingSettings
    );
  };

  console.log(
    "what's in here",
    authenticationInfos?.shop?.shopData?.SellingSettings?.[lang.id]?.[
      condition.id
    ]?.[isFoil]
  );

  const priceDisplayed =
    authenticationInfos?.shop?.shopData?.SellingSettings?.[lang.id]?.[
      condition.id
    ]?.[isFoil].price === null ||
    authenticationInfos?.shop?.shopData?.SellingSettings?.[lang.id]?.[
      condition.id
    ]?.[isFoil].price === undefined
      ? ""
      : authenticationInfos?.shop?.shopData?.SellingSettings[lang.id][
          condition.id
        ][isFoil].price;

  return (
    <div>
      <span>{condition[conditionShortname]}</span>
      <select>
        {Object.keys(allPricesAvailableOnMKM).map((onePrice) => (
          <option value={onePrice}>
            {intl.formatMessage({
              id: allPricesAvailableOnMKM[onePrice],
              defaultMessage: allPricesAvailableOnMKM[onePrice],
            })}
          </option>
        ))}
      </select>
      <input
        type="text"
        onChange={(event) => handleChange(event, lang, isFoil, condition)}
        value={priceDisplayed}
      />
    </div>
  );
};

export default SellingSettingsCondition;
