import React, { useContext, useState } from "react";
import languagesDefinition from "../definitions/languagesDefinition";
import userPreferencesContext from "../context/userPreferenceContext";
import { useEffect } from "react";

const SetLangChoice = ({ langsAvailable }) => {
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

  return (
    <div className="set-lang-choosing">
      {arrayLangAvailables.map((lang, index) => (
        <div
          className="flag-drop-down"
          key={lang}
          onClick={(event) =>
            setUserPreferences({
              ...userPreferences,
              cardsSetLang: parseInt(lang),
            })
          }
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
