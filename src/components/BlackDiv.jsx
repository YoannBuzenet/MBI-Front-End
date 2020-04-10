import React, { useContext } from "react";
import BlackDivContext from "../context/blackDivModalContext";
import CardDisplayOnPageContext from "../context/cardDisplayOnPageContext";
import isResponsiveMenuDisplayedContext from "../context/menuDisplayedContext";

// The black Div is the modal we display behind each 'absolute positionned' elements on the window.
// We give it the general ability to deactivate any absolute display by clicking on it.

const BlackDiv = (props) => {
  //Black Div control
  const { isBlackDivModalDisplayed, setIsBlackDivModalDisplayed } = useContext(
    BlackDivContext
  );

  //Responsive Menu control
  const { cardDisplayInformation, setCardDisplayInformation } = useContext(
    CardDisplayOnPageContext
  );

  //Card Display control
  const {
    isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed,
  } = useContext(isResponsiveMenuDisplayedContext);

  const handleClick = (event) => {
    console.log("removing the div and everything on it");
  };

  return <div className="blackDiv"></div>;
};

export default BlackDiv;
