import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import SelectAppLangContext from "../context/selectedAppLang";
import config from "../services/config";

const AppWrapper = (props) => {
  //STATE - App Lang
  //Test that : : fr-FR, en-US, en-GB
  const [currentLang, setCurrentLang] = useState(
    config.websiteDefaultLanguageContext
  );

  //CONTEXT CREATION
  const AppLangContext = {
    currentLang: currentLang,
    setCurrentLang: setCurrentLang,
  };

  return (
    <SelectAppLangContext.Provider value={AppLangContext}>
      <IntlProvider
        locale={currentLang.locale}
        messages={currentLang.translationsForUsersLocale}
      >
        {props.children}
      </IntlProvider>
    </SelectAppLangContext.Provider>
  );
};

export default AppWrapper;
