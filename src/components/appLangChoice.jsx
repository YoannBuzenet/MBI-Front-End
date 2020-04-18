import React, { useContext, useState } from "react";
import SelectAppLangContext from "../context/selectedAppLang";
import config from "../services/config";

const AppLangChoice = () => {
  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  const [arrayLangAvailables, setArrayLangAvailables] = useState(
    config.websiteDefaultLanguageArrayLangAvailables
  );

  const [areFlagsDisplayed, setAreFlagsDisplayed] = useState(false);

  const handleClick = (event, lang) => {
    setCurrentLang({
      locale: lang.locale,
      translationsForUsersLocale: lang.translationsForUsersLocale,
      picture: lang.picture,
    });
  };

  const handleClickDisplayFlags = (event) => {
    setAreFlagsDisplayed(!areFlagsDisplayed);
  };

  return (
    <>
      {areFlagsDisplayed && (
        <div
          className="transparent-div"
          onClick={(e) => handleClickDisplayFlags(e)}
        ></div>
      )}
      <div className="current-app-lang">
        <div
          className="current-lang-flag"
          onClick={(e) => handleClickDisplayFlags(e)}
        >
          <img src={"/flags/25X13/" + currentLang.picture + ".png"} alt="" />
          <span className="arrow-menu arrow-app-lang"></span>

          {areFlagsDisplayed && (
            <div className={"set-lang-choosing lang-select-applevel"}>
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
          )}
        </div>
      </div>
    </>
  );
};

export default AppLangChoice;
