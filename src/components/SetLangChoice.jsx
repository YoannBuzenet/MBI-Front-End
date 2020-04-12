import React, { useContext } from "react";
import languagesDefinition from "../definitions/languagesDefinition";
import userPreferencesContext from "../context/userPreferenceContext";

const SetLangChoice = ({ langsAvailable }) => {
  const { userPreferences, setUserPreferences } = useContext(
    userPreferencesContext
  );

  console.log(userPreferences);

  return (
    <div className="set-lang-choosing">
      {Object.keys(langsAvailable).map((lang, index) => (
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
