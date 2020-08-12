import React, { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { FormattedMessage } from "react-intl";

const ShopAdminSettingsBasePrice = (props) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //WE MUST UPDATE CONTEXT AND API JSON

  //We add a timer to not hit API at each user input.
  //This way there is at least WAIT_INTERVAL interval between each sending, or more if the user continues to input.
  const WAIT_INTERVAL = 1000;
  const [timer, setTimer] = useState(null);

  const handlechange = (event) => {
    //ici on gère le timer puis on set le new context puis on set le JSON sur le serveur

    setTimer(clearTimeout(timer));
    var { name, value } = event.target;
    if (event.target.value[event.target.value.length - 1] === ".") {
      //TODO check ça
      //   updateState(fieldModified, name, value);
    } else if (!isNaN(parseFloat(event.target.value))) {
      value = parseFloat(value);
      //TODO check ça
      //   updateState(fieldModified, name, value);

      setTimer(
        setTimeout(
          () => triggerAPISending(fieldModified, name, value),
          WAIT_INTERVAL
        )
      );
    } else if (event.target.value === "") {
      //TODO check ça
      //We don't update on API to not create an empty field that would create bugs. We wait for another input to PUT the data.
      //   updateState(fieldModified, name, value);
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

  const triggerAPISending = () => {
    //may be useful
  };

  return (
    <>
      <div>
        <p>1. Set the base price</p>
        <p>2. Adjust the percentage following language, condition, and foil</p>
      </div>
      <div>
        <h2>
          <FormattedMessage
            id="app.shop.shopSettings.priceRange.title"
            defaultMessage={`Price Range`}
          />
        </h2>
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
                      onChange={handlechange}
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
