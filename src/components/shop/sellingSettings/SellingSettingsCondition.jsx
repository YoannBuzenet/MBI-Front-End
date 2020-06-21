import React, { useContext } from "react";
import SellingSettingsContext from "../../../context/sellingSettingsContext";

const SellingSettingsCondition = (props) => {
  const { SellingSettings, setSellingSettings } = useContext(
    SellingSettingsContext
  );

  return <div>Condition</div>;
};

export default SellingSettingsCondition;
