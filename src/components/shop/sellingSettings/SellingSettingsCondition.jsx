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

  // console.log(lang, conditions);

  const [timer, setTimer] = useState(null);

  const WAIT_INTERVAL = 2000;

  //Aligning the boolean to the JSON
  isFoil = isFoil ? 1 : 0;

  // console.log(authenticationInfos);

  //Hook Intl to translate an attribute
  const intl = useIntl();

  const conditionShortname =
    process.env.REACT_APP_SHOP_GRADING_AREA === "EU"
      ? "shortname"
      : "shortnameUS";

  //If it's needed to get the condition complete name ("Near Mint")
  const conditionCompleteName =
    "shortname" + process.env.REACT_APP_SHOP_GRADING_AREA;

  const handleChange = (event, langObject, isFoil, condition) => {
    setTimer(clearTimeout(timer));
    console.log("input");
    const newContext =
      authenticationInfos.shop.shopData.SellingSettings
        .percentToSetSellingPrices;
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
            SellingSettings: {
              ...authenticationInfos.shop.shopData.SellingSettings,
              percentToSetSellingPrices: newContext,
            },
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
            SellingSettings: {
              ...authenticationInfos.shop.shopData.SellingSettings,
              percentToSetSellingPrices: newContext,
            },
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

  const handleChangeSelect = (event, langObject, isFoil, condition) => {
    setTimer(clearTimeout(timer));
    const newAlgoChosen = event.target.value;
    console.log(newAlgoChosen);
    const newContext =
      authenticationInfos.shop.shopData.SellingSettings
        .percentToSetSellingPrices;
    console.log("on met à jour l'algo dans le contexte");
    if (condition.id === 1) {
      //On maj les 7 conditions
      for (let i = 0; i < conditions.length; i++) {
        newContext[langObject.id][conditions[i].id][
          isFoil
        ].algoName = newAlgoChosen;
      }
    } else {
      // on mAJ que la bonne ligne
      newContext[langObject.id][condition.id][isFoil].algoName = newAlgoChosen;
    }
    setAuthenticationInfos({
      ...authenticationInfos,
      shop: {
        ...authenticationInfos.shop,
        shopData: {
          ...authenticationInfos.shop.shopData,
          SellingSettings: {
            ...authenticationInfos.shop.shopData.SellingSettings,
            percentToSetSellingPrices: newContext,
          },
        },
      },
    });

    setTimer(setTimeout(() => triggerAPISending(), WAIT_INTERVAL));
  };

  const triggerAPISending = () => {
    console.log("sending to Express !");
    shopAPI.postSellingSettings(authenticationInfos);
  };

  const percentDisplayed =
    authenticationInfos?.shop?.shopData?.SellingSettings
      ?.percentToSetSellingPrices?.[langObject.id]?.[condition.id]?.[isFoil]
      .percent === null ||
    authenticationInfos?.shop?.shopData?.SellingSettings
      ?.percentToSetSellingPrices?.[langObject.id]?.[condition.id]?.[isFoil]
      .percent === undefined
      ? ""
      : authenticationInfos?.shop?.shopData?.SellingSettings
          ?.percentToSetSellingPrices?.[langObject.id][condition.id][isFoil]
          .percent;

  const algoDisplayed =
    authenticationInfos?.shop?.shopData?.SellingSettings
      ?.percentToSetSellingPrices?.[langObject.id]?.[condition.id]?.[isFoil]
      .algoName === null ||
    authenticationInfos?.shop?.shopData?.SellingSettings
      ?.percentToSetSellingPrices?.[langObject.id]?.[condition.id]?.[isFoil]
      .algoName === undefined
      ? ""
      : authenticationInfos?.shop?.shopData?.SellingSettings
          ?.percentToSetSellingPrices?.[langObject.id][condition.id][isFoil]
          .algoName;

  return (
    <div className="SellingPercentageContainer">
      <span>{condition[conditionShortname]}</span>
      <select
        onChange={(event) =>
          handleChangeSelect(event, langObject, isFoil, condition)
        }
        value={algoDisplayed}
      >
        {Object.keys(allPricesAvailableOnMKM)
          .filter((onePrice) => {
            if (isFoil) {
              return (
                onePrice === "foilAvg1" ||
                onePrice === "foilAvg7" ||
                onePrice === "foilAvg30" ||
                onePrice === "foilLow" ||
                onePrice === "foiltrend"
              );
            } else {
              return (
                onePrice === "AvgSellPrice" ||
                onePrice === "avg1" ||
                onePrice === "avg7" ||
                onePrice === "avg30" ||
                onePrice === "trendPrice" ||
                onePrice === "germanProLow" ||
                onePrice === "lowPrice" ||
                onePrice === "lowPriceEx" ||
                onePrice === "suggestedPrice"
              );
            }
          })
          .map((onePrice) => {
            // console.log("info to check", onePrice);
            return (
              <option value={onePrice}>
                {intl.formatMessage({
                  id: allPricesAvailableOnMKM[onePrice],
                  defaultMessage: allPricesAvailableOnMKM[onePrice],
                })}
              </option>
            );
          })}
      </select>
      <input
        type="text"
        onChange={(event) => handleChange(event, langObject, isFoil, condition)}
        value={percentDisplayed}
        className="SellingPercentageInput"
      />
    </div>
  );
};

export default SellingSettingsCondition;
