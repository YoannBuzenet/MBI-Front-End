import React, { useContext } from "react";
import SellingSettingsCondition from "./SellingSettingsCondition";
import GenericCardInfosContext from "../../../context/genericCardInfosContext";

const SellingSettingsFoilNonFoil = (props) => {
  //DEFINED langages and Conditions
  const { conditions } = useContext(GenericCardInfosContext);

  return (
    <div className="foilConditionsContainer">
      <div>
        Foil
        <div>
          {conditions.map((oneCondition) => (
            <SellingSettingsCondition />
          ))}
        </div>
      </div>
      <div>
        Non Foil
        <div>
          {conditions.map((oneCondition) => (
            <SellingSettingsCondition />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellingSettingsFoilNonFoil;
