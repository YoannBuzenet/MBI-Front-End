import React, { useContext } from "react";
import SellingSettingsCondition from "./SellingSettingsCondition";
import GenericCardInfosContext from "../../../context/genericCardInfosContext";

const SellingSettingsFoilNonFoil = ({ lang }) => {
  //DEFINED langages and Conditions
  const { conditions } = useContext(GenericCardInfosContext);

  return (
    <div className="foilConditionsContainer">
      <div>
        Regular
        <div>
          {conditions.map((oneCondition, index) => (
            <SellingSettingsCondition
              isFoil={false}
              condition={oneCondition}
              langObject={lang}
              key={lang.id + "" + index}
            />
          ))}
        </div>
      </div>
      <div>
        Foil
        <div>
          {conditions.map((oneCondition, index) => (
            <SellingSettingsCondition
              isFoil={true}
              condition={oneCondition}
              langObject={lang}
              key={lang.id + "" + index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellingSettingsFoilNonFoil;
