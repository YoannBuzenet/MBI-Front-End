import React, { useContext } from "react";
import SelectAppLangContext from "../context/selectedAppLang";

const appLangChoice = (props) => {
  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  return <>Langs</>;
};

export default appLangChoice;
