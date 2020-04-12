import React from "react";
import languagesDefinition from "../definitions/languagesDefinition";

//use languagesDefinition.langDefinitionIDShortName

const SetLangChoice = ({ langsAvailable }) => {
  return (
    <div className="set-lang-choosing">
      {langsAvailable.map((lang, index) => console.log(lang))}
    </div>
  );
};

export default SetLangChoice;
