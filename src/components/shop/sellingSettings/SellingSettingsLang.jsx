import React from "react";
import SellingSettingsFoilNonFoil from "./SellingSettingsFoilNonFoil";

//This components display a lang and creates the foil/non foil components

const SellingSettingsLang = ({ lang }) => {
  return (
    <>
      <SellingSettingsFoilNonFoil lang={lang} key={lang.id} />
    </>
  );
};

export default SellingSettingsLang;
