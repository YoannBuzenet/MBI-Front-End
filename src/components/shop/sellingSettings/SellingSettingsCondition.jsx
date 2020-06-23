import React, { useContext, useState } from "react";
import AuthContext from "../../../context/authContext";
import GenericCardInfosContext from "../../../context/genericCardInfosContext";
import config from "../../../services/config";
import { allPricesAvailableOnMKM } from "../../../services/mkmPriceGuideDefinition";
import { useIntl, FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import priceUpdateAPI from "../../../services/priceUpdateAPI";
import shopAPI from "../../../services/shopAPI";

const SellingSettingsCondition = ({ isFoil, condition, langObject }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  const [timer, setTimer] = useState(null);

  const WAIT_INTERVAL = 2000;

  //Aligning the boolean to the JSON
  isFoil = isFoil ? 1 : 0;
  console.log("line id", isFoil, condition, langObject);
  console.log(authenticationInfos);

  //Hook Intl to translate an attribute
  const intl = useIntl();

  const conditionShortname =
    config.gradingArea === "EU" ? "shortname" : "shortnameUS";

  //If it's needed to get the condition complete name ("Near Mint")
  const conditionCompleteName = "shortname" + config.gradingArea;

  const handleChange = (event, langObject, isFoil, condition) => {
    setTimer(clearTimeout(timer));
    console.log("input");
    const newContext = authenticationInfos.shop.shopData.SellingSettings;
    const newPercent = parseInt(event.target.value);

    if (!isNaN(parseFloat(newPercent))) {
      if (condition.id === 1) {
        //If Mint condition is updated, we compute all condition of the current lang/isFoil
        //Adjust % for each condition
        for (let i = 0; i < conditions.length; i++) {
          newContext[langObject.id][conditions[i].id][
            isFoil
          ].percent = priceUpdateAPI.smoothNumbers(
            newPercent * config.defaultSellingPercents[i]
          );
        }
      } else {
        //If non Mint condition is updated, we don't change other prices
      }
      newContext[langObject.id][condition.id][isFoil].percent = newPercent;
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
      setTimer(setTimeout(() => triggerAPISending(), WAIT_INTERVAL));
    } else if (event.target.value === "") {
      newContext[langObject.id][condition.id][isFoil].percent = 0;
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
      setTimer(setTimeout(() => triggerAPISending(), WAIT_INTERVAL));
    } else {
      toast.error(
        <FormattedMessage
          id="app.shop.priceFormUpdate.inputNumer.toast.error"
          defaultMessage={`Please indicate a number.`}
        />
      );
    }
  };

  const handleChangeSelect = (event) => {
    console.log("on met à jour l'algo dans le contexte");
  };

  const triggerAPISending = () => {
    console.log("sending to Express !");
    shopAPI.postSellingSettings(authenticationInfos);
  };

  const percentDisplayed =
    authenticationInfos?.shop?.shopData?.SellingSettings?.[langObject.id]?.[
      condition.id
    ]?.[isFoil].percent === null ||
    authenticationInfos?.shop?.shopData?.SellingSettings?.[langObject.id]?.[
      condition.id
    ]?.[isFoil].percent === undefined
      ? ""
      : authenticationInfos?.shop?.shopData?.SellingSettings[langObject.id][
          condition.id
        ][isFoil].percent;

  const algoDisplayed =
    authenticationInfos?.shop?.shopData?.SellingSettings?.[langObject.id]?.[
      condition.id
    ]?.[isFoil].algoName === null ||
    authenticationInfos?.shop?.shopData?.SellingSettings?.[langObject.id]?.[
      condition.id
    ]?.[isFoil].algoName === undefined
      ? ""
      : authenticationInfos?.shop?.shopData?.SellingSettings[langObject.id][
          condition.id
        ][isFoil].algoName;

  return (
    <div>
      <span>{condition[conditionShortname]}</span>
      <select
        onChange={(event) => handleChangeSelect(event)}
        value={algoDisplayed}
      >
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
        onChange={(event) => handleChange(event, langObject, isFoil, condition)}
        value={percentDisplayed}
      />
    </div>
  );
};

export default SellingSettingsCondition;
