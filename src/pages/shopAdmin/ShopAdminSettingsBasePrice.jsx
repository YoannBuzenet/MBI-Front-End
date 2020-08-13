import React, { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import shopAPI from "../../services/shopAPI";

const ShopAdminSettingsBasePrice = (props) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //We add a timer to not hit API at each user input.
  //This way there is at least WAIT_INTERVAL interval between each sending, or more if the user continues to input.
  const WAIT_INTERVAL = 1000;
  const [timer, setTimer] = useState(null);

  const handlechange = (event, index) => {
    setTimer(clearTimeout(timer));
    let { value, name } = event.target;

    //ici on gère le timer puis on set le new context puis on set le JSON sur le serveur
    if (value[value.length - 1] === ".") {
      let contextCopy = { ...authenticationInfos };
      contextCopy.shop.shopData.SellingSettings.priceRangesForBaseSellingPrice[
        index
      ][2] = value;
      setAuthenticationInfos(contextCopy);
    } else if (!isNaN(parseFloat(value))) {
      value = parseFloat(value);
      let contextCopy = { ...authenticationInfos };
      contextCopy.shop.shopData.SellingSettings.priceRangesForBaseSellingPrice[
        index
      ][2] = value;
      setAuthenticationInfos(contextCopy);

      setTimer(setTimeout(() => triggerAPISending(), WAIT_INTERVAL));
    } else if (value === "") {
      let contextCopy = { ...authenticationInfos };
      contextCopy.shop.shopData.SellingSettings.priceRangesForBaseSellingPrice[
        index
      ][2] = value;
      setAuthenticationInfos(contextCopy);
      toast.error(
        <FormattedMessage
          id="app.shop.shopSettings.toast.input.failure"
          defaultMessage={`A number is mandatory for each language and condition. Please indicate one.`}
        />
      );
    } else {
      console.log("else");
      toast.error(
        <FormattedMessage
          id="app.shop.shopSettings.toast.input.number.failure"
          defaultMessage={`A number is mandatory for each language and condition. Please indicate one.`}
        />
      );
    }
  };

  const handleTickBox = (e) => {
    setTimer(clearTimeout(timer));
    let contextCopy = { ...authenticationInfos };
    contextCopy.shop.shopData.SellingSettings.shouldUseShopBasePriceStep = !contextCopy
      .shop.shopData.SellingSettings.shouldUseShopBasePriceStep;

    setAuthenticationInfos(contextCopy);

    setTimer(setTimeout(() => triggerAPISending(), WAIT_INTERVAL));
  };

  const triggerAPISending = () => {
    console.log("sending to Express !");
    shopAPI.postSellingSettings(authenticationInfos);
  };

  return (
    <>
      <div className="explaination-container">
        <div className="explaination-text">
          <h3>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.title"
              defaultMessage={`How to Fix your selling prices`}
            />
          </h3>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph1"
              defaultMessage={`The selling price is set automatically following the criterias that you will indicate here.`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph2"
              defaultMessage={`The selling price is set that way :`}
            />
          </p>
          <p>
            <span className="explaination-text-li-number">1.</span>{" "}
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph3"
              defaultMessage={`Get the MKM price from MKM you did choose : Price trend, or Average price on 7 days, etc...`}
            />
          </p>
          <p>
            <span className="explaination-text-li-number">2.</span>{" "}
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph4"
              defaultMessage={`The price is then passed into the Price Range you did set up. Price range allow to round up prices. You can disable this step if you want. We advise to disable it if you want to always have your selling prices fixed with a percentage from the trend. Price Range are here to "round up" prices like it usually happens in business.`}
            />
          </p>
          <p>
            <span className="explaination-text-li-number">3.</span>{" "}
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph5"
              defaultMessage={`Following the language, condition, and if it's foil or not, we modify the price with the percentage you fixed.`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph6"
              defaultMessage={`Final Price = MKM Price You chose, passed eventually in Price Range, multiplied by percentage for Condition, Language, Foil`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph7"
              defaultMessage={`Said another way :`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part1"
              defaultMessage={`Final Price = `}
            />
            <span className="bold">
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part2"
                defaultMessage={`MKM Market Initial Price`}
              />
            </span>{" "}
            {"->"}{" "}
            <span className="bold">
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part3"
                defaultMessage={`Price Range`}
              />
            </span>{" "}
            X{" "}
            <span>
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part4"
                defaultMessage={`conditionPercentage`}
              />
            </span>{" "}
            X{" "}
            <span className="bold">
              <FormattedMessage
                id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part5"
                defaultMessage={`Language Percentage`}
              />
            </span>
          </p>
        </div>
        <div className="explaination-example">
          <h3>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.title"
              defaultMessage={`Example 1 :`}
            />
          </h3>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.paragrap1"
              defaultMessage={`A card is worth 1.24 of price trend euro on MKM. In your Price Range, you said that anything between 1 and 1.5 should be sold for 2.5 euros.`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.paragrap2"
              defaultMessage={`The card is in Portuguese, Light Played, non foil. You added the following parameters : Portuguese : 70%, Light Played : 60%.`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.paragrap3"
              defaultMessage={`Final Price will be : 2.5*0.7*0.6 = 1.05 euro because it's a Portuguese Light Played card you would have sold for 2.5 in your language of preference.`}
            />
          </p>
          <h3>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.title"
              defaultMessage={`Example 2 :`}
            />
          </h3>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.paragraph1"
              defaultMessage={`A card is worth 6.87 of price trend euro on MKM. In your Price Range, you said that anything between 6 and 7 should be sold for 8 euros.`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.paragraph2"
              defaultMessage={`The card is in English, Exc, foil. You added the following parameters : English : 100%, Exc : 80%.`}
            />
          </p>
          <p>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.paragraph3"
              defaultMessage={`Final Price will be : 8*1*0.8 = 6.4 euro because it's a English Exc card you would have sold for 8 in English Near Mint.`}
            />
          </p>
        </div>
      </div>
      <div>
        <h2>
          <FormattedMessage
            id="app.shop.shopSettings.priceRange.title"
            defaultMessage={`Price Range`}
          />
        </h2>
        <div>
          <form>
            <input
              type="checkbox"
              id="checkBoxPriceRange"
              checked={
                authenticationInfos?.shop?.shopData?.SellingSettings
                  ?.shouldUseShopBasePriceStep
              }
              onChange={handleTickBox}
            />
            <label htmlFor="checkBoxPriceRange">
              <FormattedMessage
                id="app.shop.shopSettings.priceRange.checkbox.text"
                defaultMessage={`I want to USE the Price Range step that will be applied before the percentage. Untick this box if you only want to use the percentages.`}
              />
            </label>
          </form>
        </div>
        <div>
          {Array.isArray(
            authenticationInfos?.shop?.shopData?.SellingSettings
              ?.priceRangesForBaseSellingPrice
          ) &&
            authenticationInfos?.shop?.shopData?.SellingSettings?.priceRangesForBaseSellingPrice.map(
              (priceRange, index) => {
                return (
                  <div className="RangePriceDisplay">
                    <FormattedMessage
                      id="app.shop.shopSettings.priceRange.part0"
                      defaultMessage={`If the MKM price is above `}
                    />
                    {priceRange[0]}
                    <FormattedMessage
                      id="app.shop.shopSettings.priceRange.part1"
                      defaultMessage={` and above `}
                    />
                    {priceRange[1]}
                    <FormattedMessage
                      id="app.shop.shopSettings.priceRange.part2"
                      defaultMessage={`, Base price will be : `}
                    />
                    <input
                      type="text"
                      value={priceRange[2]}
                      onChange={(e) => handlechange(e, index)}
                    />
                  </div>
                );
              }
            )}
        </div>
      </div>
    </>
  );
};

export default ShopAdminSettingsBasePrice;
