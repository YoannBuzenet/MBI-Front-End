import React from "react";
import languagesDefinition from "../definitions/languagesDefinition";

const SetLangChoice = ({ langsAvailable }) => {
  return (
    <div className="set-lang-choosing">
      {Object.keys(langsAvailable).map((lang, index) => (
        <div className="flag-drop-down" key={lang}>
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
