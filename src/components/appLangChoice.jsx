import React, { useContext, useState } from "react";
import SelectAppLangContext from "../context/selectedAppLang";
import config from "../services/config";

const AppLangChoice = () => {
  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  const [arrayLangAvailables, setArrayLangAvailables] = useState(
    config.websiteDefaultLanguageArrayLangAvailables
  );

  const handleClick = (event, lang) => {
    setCurrentLang({
      locale: lang.locale,
      translationsForUsersLocale: lang.translationsForUsersLocale,
    });
  };

  return (
    <div className="current-app-lang">
      <div className={"set-lang-choosing"}>
        {arrayLangAvailables.map((lang, index) => (
          <div
            className="flag-drop-down"
            key={index}
            onClick={(event) => handleClick(event, lang)}
          >
            <img src={"/flags/25X13/" + lang.picture + ".png"} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppLangChoice;
