import React from "react";
import { FormattedMessage } from "react-intl";
import config from "../services/config";

const LanguageNameDisplay = ({ langID }) => {
  return (
    <FormattedMessage
      id={
        "config.definition.lang." + config.langDefinition[langID].toLowerCase()
      }
      defaultMessage={config.langDefinition[langID].toLowerCase()}
    />
  );
};

export default LanguageNameDisplay;
