import React, { useState, useContext } from "react";
import AuthContext from "../../context/authContext";

const ShopAdminSettingsBasePrice = (props) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

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
                    <input type="text" value={priceRange[2]} />
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
