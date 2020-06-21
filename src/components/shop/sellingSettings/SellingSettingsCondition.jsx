import React, { useContext } from "react";
import SellingSettingsContext from "../../../context/sellingSettingsContext";
import config from "../../../services/config";
import { allPricesAvailableOnMKM } from "../../../services/mkmPriceGuideDefinition";
import { useIntl } from "react-intl";

const SellingSettingsCondition = ({ isFoil, condition, lang }) => {
  const { SellingSettings, setSellingSettings } = useContext(
    SellingSettingsContext
  );

  console.log(isFoil, condition, lang);
  //Hook Intl to translate an attribute
  const intl = useIntl();

  return (
    <div>
      <span>{condition["name" + config.gradingArea]}</span>
      <select>
        {Object.keys(allPricesAvailableOnMKM).map((onePrice) => (
          <option value={onePrice}>
            {intl.formatMessage({
              id: allPricesAvailableOnMKM[onePrice],
              defaultMessage: allPricesAvailableOnMKM[onePrice],
            })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SellingSettingsCondition;
