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
        {authenticationInfos?.shop?.shopData?.SellingSettings
          ?.shouldUseShopBasePriceStep && (
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
        )}
      </div>
    </>
  );
};

export default ShopAdminSettingsBasePrice;
