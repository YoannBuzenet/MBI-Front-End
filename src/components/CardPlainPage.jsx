import React from "react";
import CardDisplayOnPageContext from "../context/cardDisplayOnPageContext";
import BlackDivModalContext from "../context/blackDivModalContext";

const CardPlainPage = ({ urlPicture }) => {
  //Black Div control
  const { isBlackDivModalDisplayed, setIsBlackDivModalDisplayed } = useContext(
    BlackDivModalContext
  );

  //Card display on whole page
  const { cardDisplayInformation, setCardDisplayInformation } = useContext(
    CardDisplayOnPageContext
  );

  return (
    <div
      className="card-modal"
      onClick={event => {
        const newCardDisplayInformation = { ...cardDisplayInformation };
        newCardDisplayInformation.isDisplayed = false;
        setCardDisplayInformation(newCardDisplayInformation);
        setIsBlackDivModalDisplayed(false);
      }}
    >
      Card Plain Page <img src={cardDisplayInformation.cardPictureUrl} alt="" />
    </div>
  );
};

export default CardPlainPage;
