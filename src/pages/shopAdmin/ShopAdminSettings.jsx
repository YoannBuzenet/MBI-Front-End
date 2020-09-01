import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authContext";
import GenericCardInfosContext from "../../context/genericCardInfosContext";
import Field from "../../components/forms/Field";
import { toast } from "react-toastify";
import shopAPI from "../../services/shopAPI";
import localStorageAPI from "../../services/localStorageAPI";
import errorHandlingAPI from "../../services/errorHandlingAPI";
import { FormattedMessage } from "react-intl";
import LanguageNameDisplay from "../../components/LanguageNameDisplay";
import config from "../../services/config";
import AppLangChoice from "../../components/AppLangChoice";
import SellingSettingsLang from "../../components/shop/sellingSettings/SellingSettingsLang";
import ShopAdminSettingsBasePrice from "./ShopAdminSettingsBasePrice";

const ShopAdminSettings = () => {
  //Handling shop Settings here
  //Percent buying are stored in localstorage, session context and on central API
  // TODO Selling Settings should be stored on localstorage, for now they are session context and Express API

  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //DEFINED langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  useEffect(() => {
    if (!authenticationInfos?.shop?.shopData?.SellingSettings) {
      initializeSellingPriceContext();
      console.log("initializing content");
    }
  }, [authenticationInfos, setAuthenticationInfos]);

  //We add a timer to not hit API at each user input.
  //This way there is at least WAIT_INTERVAL interval between each sending, or more if the user continues to input.
  const WAIT_INTERVAL = 1000;
  const [timer, setTimer] = useState(null);

  console.log(authenticationInfos);

  const updateState = (fieldModified, name, value) => {
    const authenticationInfosCopy = { ...authenticationInfos };
    switch (fieldModified) {
      case "percentPerLang":
        authenticationInfosCopy.shop.shopData.PercentPerLangs[
          name
        ].percentPerLang = value;
        setAuthenticationInfos(authenticationInfosCopy);

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

      case "percentPerSigned":
        authenticationInfosCopy.shop.shopData.PercentPerSigned = value;
        setAuthenticationInfos(authenticationInfosCopy);
        break;

      default:
        return;
    }
  };

  const updateLocalStorage = (fieldModified, name, value) => {
    //Get Local Storage
    var localStorage = localStorageAPI.getLocalStorageSession();
    // console.log(localStorage);
    switch (fieldModified) {
      case "percentPerLang":
        localStorage.shop.PercentPerLangs[name].percentPerLang = value;
        break;

      case "percentPerCondition":
        localStorage.shop.PercentPerConditions[name - 1].percent = value;
        break;

      case "percentPerConditionFoil":
        localStorage.shop.PercentPerConditionFoils[name - 1].percent = value;
        break;

      case "percentPerSigned":
        localStorage.shop.percentPerSigned = value;
        break;
      default:
        return;
    }
    localStorageAPI.saveLocalStorage("userInfos", localStorage);
  };

  const triggerAPISending = (fieldModified, name, value) => {
    //Build object ?
    let id;
    let objectToSend = {
      percent: value,
    };
    switch (fieldModified) {
      case "percentPerLang":
        id = authenticationInfos.shop.shopData.PercentPerLangs[name].id;

        shopAPI
          .updatePercentPerLang(id, objectToSend)
          .then((data) => updateLocalStorage(fieldModified, name, value))
          .catch((data) => {
            if (!errorHandlingAPI.check401Unauthorized(data)) {
              toast.error(
                <FormattedMessage
                  id="app.shop.shopSettings.toast.failure"
                  defaultMessage={`The data couldn't be updated. Please try again.`}
                />
              );
            }
          });
        break;
      case "percentPerCondition":
        id =
          authenticationInfos.shop.shopData.PercentPerConditions[name - 1].id;
        shopAPI
          .updatePercentPerCondition(id, objectToSend)
          .then(updateLocalStorage(fieldModified, name, value))
          .catch((data) => {
            if (!errorHandlingAPI.check401Unauthorized(data)) {
              toast.error(
                <FormattedMessage
                  id="app.shop.shopSettings.toast.failure"
                  defaultMessage={`The data couldn't be updated. Please try again.`}
                />
              );
            }
          });

        break;
      case "percentPerConditionFoil":
        id =
          authenticationInfos.shop.shopData.PercentPerConditions[name - 1].id;

        shopAPI
          .updatePercentPerConditionFoil(id, objectToSend)
          .then((data) => updateLocalStorage(fieldModified, name, value))
          .catch((data) => {
            if (!errorHandlingAPI.check401Unauthorized(data)) {
              toast.error(
                <FormattedMessage
                  id="app.shop.shopSettings.toast.failure"
                  defaultMessage={`The data couldn't be updated. Please try again.`}
                />
              );
            }
          });
        break;

      case "percentPerSigned":
        console.log("API update signed");
        objectToSend = {
          shop: {
            id: authenticationInfos.shop.id,
            percentPerSigned:
              authenticationInfos.shop.shopData.PercentPerSigned,
          },
        };

        shopAPI
          .updateFields(objectToSend, authenticationInfos.shop.id)
          .then((data) => updateLocalStorage(fieldModified, name, value))
          .catch((error) => {
            if (!errorHandlingAPI.check401Unauthorized(error)) {
              toast.error(
                <FormattedMessage
                  id="app.shop.shopSettings.toast.failure"
                  defaultMessage={`The data couldn't be updated. Please try again.`}
                />
              );
            }
          });
        break;

      default:
        return;
    }
  };

  const handleChange = (event, fieldModified) => {
    setTimer(clearTimeout(timer));
    var { name, value } = event.target;

    if (event.target.value[event.target.value.length - 1] === ".") {
      updateState(fieldModified, name, value);
    } else if (!isNaN(parseFloat(event.target.value))) {
      value = parseFloat(value);
      updateState(fieldModified, name, value);

      setTimer(
        setTimeout(
          () => triggerAPISending(fieldModified, name, value),
          WAIT_INTERVAL
        )
      );
    } else if (event.target.value === "") {
      //We don't update on API to not create an empty field that would create bugs. We wait for another input to PUT the data.
      updateState(fieldModified, name, value);
      toast.error(
        <FormattedMessage
          id="app.shop.shopSettings.toast.input.failure"
          defaultMessage={`A number is mandatory for each language and condition. Please indicate one.`}
        />
      );
    } else {
      toast.error(
        <FormattedMessage
          id="app.shop.shopSettings.toast.input.number.failure"
          defaultMessage={`A number is mandatory for each language and condition. Please indicate one.`}
        />
      );
    }
  };

  const initializeSellingPriceContext = () => {
    //Get something from Express API
    shopAPI.getShopSellingSettings(authenticationInfos).then((data) => {
      console.log(data);
      //Storing in Session
      setAuthenticationInfos({
        ...authenticationInfos,
        shop: {
          ...authenticationInfos.shop,
          shopData: {
            ...authenticationInfos.shop.shopData,
            SellingSettings: data.data,
          },
        },
      });
    });
  };

  return (
    <>
      <div className="container">
        <h1>
          <FormattedMessage
            id="app.shop.shopSettings.title"
            defaultMessage={`Settings`}
          />
        </h1>
        <div className="settings-language-choice">
          <p>
            <FormattedMessage
              id="app.settings.language"
              defaultMessage={`Language`}
            />
          </p>
          <div className="language-select">
            <AppLangChoice />
          </div>
        </div>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.defaultWebsiteLanguage"
            defaultMessage={`Website Default Language : `}
          />
          <LanguageNameDisplay
            langID={parseInt(process.env.REACT_APP_SHOP_BASELANG)}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.defaultBuyingLanguage"
            defaultMessage={`Default Buying Language : `}
          />
          <LanguageNameDisplay
            langID={config.websiteDefaultLanguageContext.langID}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.defaultGradingSystem"
            defaultMessage={`Grading System : `}
          />{" "}
          {process.env.REACT_APP_SHOP_GRADING_AREA}
        </p>
        <div className="categorySetting">
          <h2 className="categoryTitle">Buying Settings</h2>
          <p className="explaination">
            <FormattedMessage
              id="app.shop.shopSettings.global.Explaination"
              defaultMessage={
                "You can set general rules for settings buying prices. This will help you when modifying your buying prices. Note that these are general rules, you can always set specific buying prices card by card, afterwards."
              }
            />
          </p>
          <div className="percentSettings">
            <div className="percentPerSigned">
              <h2>
                <FormattedMessage
                  id="app.shop.shopSettings.signedCards"
                  defaultMessage={`Signed Cards`}
                />
              </h2>
              <p className="explaination">
                <FormattedMessage
                  id="app.shop.shopSettings.percentSignedExplaination"
                  defaultMessage={
                    "Generally speaking, do you want to pay more, or less, or equal, for a signed card ? 100% is the same price. This is a general rule. You can always specify a specific price for a particular card."
                  }
                />
              </p>
              <form>
                <Field
                  name="percentPerSigned"
                  label={
                    <FormattedMessage
                      id="app.shop.shopSettings.labelPercentToApply"
                      defaultMessage={`Percent to Apply`}
                    />
                  }
                  value={authenticationInfos.shop.shopData.PercentPerSigned}
                  onChange={(event) => handleChange(event, "percentPerSigned")}
                />
              </form>
            </div>
            <div className="percentPerLang">
              <h2>
                <FormattedMessage
                  id="app.shop.shopSettings.languages"
                  defaultMessage={`Languages`}
                />
              </h2>
              <p className="explaination">
                <FormattedMessage
                  id="app.shop.shopSettings.percentExplaination"
                  defaultMessage={`Choose which percentage you wish to pay per language. Your default buying language should be 100%. For example, if you want to pay a language 50% cheaper than English which is your favorite language, indicate 100% in English, and 50% (or less) in the language you don't really want. `}
                />
              </p>

              <form>
                {lang.length > 0 &&
                  lang.map((lang, index) => (
                    <Field
                      name={lang.id}
                      label={lang.name}
                      value={
                        authenticationInfos.shop.shopData.PercentPerLangs[
                          lang.id
                        ].percentPerLang
                      }
                      onChange={(event) =>
                        handleChange(event, "percentPerLang")
                      }
                      placeholder="%"
                      key={lang.id + index}
                      idNumber={Math.random()}
                    />
                  ))}
              </form>
            </div>
            <div className="conditionsSettingsDiv">
              <span className="explaination">
                <FormattedMessage
                  id="app.shop.shopSettings.conditionsExplainations"
                  defaultMessage={`Choose the percentage you want to apply to each condition. Mint is the base number and should always be 100%.`}
                />
              </span>
              <div className="ShopSettingsConditionsFoilAndNonFoil">
                <div className="percentPerConditions">
                  <h2>
                    <FormattedMessage
                      id="app.shop.shopSettings.conditions"
                      defaultMessage={`Conditions`}
                    />
                  </h2>
                  <form>
                    {conditions.length > 0 &&
                      conditions.map((condition, index) => (
                        <Field
                          name={condition.id}
                          label={condition.nameEU}
                          value={
                            authenticationInfos.shop.shopData
                              .PercentPerConditions[condition.id - 1].percent
                          }
                          onChange={(event) =>
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
                  <h2>
                    <FormattedMessage
                      id="app.shop.shopSettings.conditionsFoil"
                      defaultMessage={`Foil Conditions`}
                    />
                  </h2>
                  <form>
                    {conditions.length > 0 &&
                      conditions.map((condition, index) => (
                        <Field
                          name={condition.id}
                          label={condition.nameEU + " Foil"}
                          value={
                            authenticationInfos.shop.shopData
                              .PercentPerConditionFoils[condition.id - 1]
                              .percent
                          }
                          onChange={(event) =>
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
          </div>
        </div>
        <div className="categorySetting">
          <h2 className="categoryTitle">
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.title"
              defaultMessage={`Selling Settings`}
            />
          </h2>

          <ShopAdminSettingsBasePrice />
          <div>
            <h3>
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.title"
                defaultMessage={`MKM Price to base selling price on, and Percentage following
              Condition and Language`}
              />
            </h3>
            <p>
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.paragraph1"
                defaultMessage={`Choose the price from MKM you want to base your selling price on.`}
              />
            </p>
            <p>
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.paragraph2"
                defaultMessage={`Then choose the percentage your want yo apply to that particular condition in that particular language.`}
              />
            </p>
            <p>
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.paragraph3"
                defaultMessage={`For example, Japanese Foil or Russian Foil, you may want to set 300% in price.`}
              />
            </p>
            <p>
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.paragraph4"
                defaultMessage={`Remember, you can always check your selling prices before validating a sell request.`}
              />
            </p>
          </div>

          <div>
            {lang.length > 0 &&
              lang.map((oneLang, index) => {
                return (
                  <div key={index}>
                    <h3>{oneLang.name}</h3>
                    <SellingSettingsLang lang={oneLang} key={oneLang.id} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAdminSettings;
