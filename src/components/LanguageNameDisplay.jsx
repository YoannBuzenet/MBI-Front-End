import React from "react";
import { FormattedMessage } from "react-intl";
import config from "../services/config";

const LanguageNameDisplay = (props) => {
  return (
    <FormattedMessage
      id={
        "config.definition.lang." +
        config.langDefinition[config.baseLang].toLowerCase()
      }
      defaultMessage={config.langDefinition[config.baseLang].toLowerCase()}
    />
  );
};

export default LanguageNameDisplay;
