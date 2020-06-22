import React, { useContext, useState } from "react";
import SellingSettingsContext from "../../../context/sellingSettingsContext";
import config from "../../../services/config";
import { allPricesAvailableOnMKM } from "../../../services/mkmPriceGuideDefinition";
import { useIntl, FormattedMessage } from "react-intl";

const SellingSettingsCondition = ({ isFoil, condition, lang }) => {
  const { SellingSettings, setSellingSettings } = useContext(
    SellingSettingsContext
  );

  const [timer, setTimer] = useState(null);

  const WAIT_INTERVAL = 2000;

  console.log(isFoil, condition, lang);

  //Hook Intl to translate an attribute
  const intl = useIntl();

  const conditionShortname =
    config.gradingArea === "EU" ? "shortname" : "shortnameUS";
  const conditionCompleteName = "shortname" + config.gradingArea;

  const handleChange = (event, lang, isFoil, condition) => {
    setTimer(clearTimeout(timer));
    console.log("input");
    const newContext = SellingSettings;
    const newPrice = event.target.value;
    if (!isNaN(parseFloat(event.target.value))) {
      newContext[lang][condition][isFoil] = newPrice;
      setTimer(
        setTimeout(
          () => triggerAPISending(event, lang, condition, isFoil),
          WAIT_INTERVAL
        )
      );
    } else if (event.target.value === "") {
      newContext[lang][condition][isFoil] = 0;
      setTimer(
        setTimeout(
          () => triggerAPISending(event, lang, condition, isFoil),
          WAIT_INTERVAL
        )
      );
    } else {
      toast.error(
        <FormattedMessage
          id="app.shop.priceFormUpdate.inputNumer.toast.error"
          defaultMessage={`Please indicate a number.`}
        />
      );
    }
  };

  const triggerAPISending = (event, lang, condition, isFoil) => {
    //MAJ l'objet sur Express : json.stringify it and send it to Express
    //Pas besoin de traitement granulaire comme sur ShopPriceCondition
    //Juste traiter le fichier et l'envoyer
  };

  return (
    <div>
      <span>{condition[conditionShortname]}</span>
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
      <input
        type="text"
        onChange={(event) => handleChange(event, lang, isFoil, condition)}
      />
    </div>
  );
};

export default SellingSettingsCondition;
