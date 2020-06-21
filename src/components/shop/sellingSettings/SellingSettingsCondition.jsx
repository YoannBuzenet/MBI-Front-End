import React, { useContext } from "react";
import SellingSettingsContext from "../../../context/sellingSettingsContext";

const SellingSettingsCondition = ({ isFoil, condition, lang }) => {
  const { SellingSettings, setSellingSettings } = useContext(
    SellingSettingsContext
  );

  console.log(isFoil);

  return <div>Condition</div>;
};

export default SellingSettingsCondition;
