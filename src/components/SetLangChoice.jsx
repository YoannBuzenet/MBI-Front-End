import React, { useContext, useState } from "react";
import languagesDefinition from "../definitions/languagesDefinition";
import userPreferencesContext from "../context/userPreferenceContext";
import { useEffect } from "react";
import localStorageAPI from "../services/localStorageAPI";

const SetLangChoice = ({ langsAvailable, classFlagsDropDown }) => {
  const { userPreferences, setUserPreferences } = useContext(
    userPreferencesContext
  );

  const [arrayLangAvailables, setArrayLangAvailables] = useState(
    Object.keys(langsAvailable)
  );

  useEffect(() => {
    if (userPreferences.cardsSetLang !== 9) {
      setArrayLangAvailables([...arrayLangAvailables, 9]);
    }
  }, [userPreferences]);

  const handleClick = (event, lang) => {
    let store_data = { cardsSetLang: parseInt(lang) };

    //Saving in localstorage
    localStorageAPI.saveLocalStorage("cardsSetLang", store_data);

    setUserPreferences({
      ...userPreferences,
      cardsSetLang: parseInt(lang),
    });
  };

  return (
    <div className={"set-lang-choosing" + classFlagsDropDown}>
      {arrayLangAvailables.map((lang, index) => (
        <div
          className="flag-drop-down"
          key={lang}
          onClick={(event) => handleClick(event, lang)}
        >
          <img
            src={
              "/flags/25X13/" +
              languagesDefinition.langDefinitionIDShortName[lang] +
              ".png"
            }
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default SetLangChoice;
