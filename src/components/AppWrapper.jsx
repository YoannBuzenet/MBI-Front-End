import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import SelectAppLangContext from "../context/selectedAppLang";
import English from "../translations/English.json";
import French from "../translations/French.json";

const AppWrapper = (props) => {
  const translationsForUsersLocale = English;

  //STATE - App Lang
  //Test that : : fr-FR, en-US, en-GB
  const [currentLang, setCurrentLang] = useState("fr-FR");

  //CONTEXT CREATION
  const AppLangContext = {
    currentLang: currentLang,
    setCurrentLang: setCurrentLang,
  };

  return (
    <SelectAppLangContext.Provider value={AppLangContext}>
      <IntlProvider locale={currentLang} messages={translationsForUsersLocale}>
        {props.children}
      </IntlProvider>
    </SelectAppLangContext.Provider>
  );
};

export default AppWrapper;
