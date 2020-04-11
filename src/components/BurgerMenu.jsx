import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import isResponsiveMenuDisplayedContext from "../context/menuDisplayedContext";
import AuthContext from "../context/authContext";
import BlackDivModalContext from "../context/blackDivModalContext";
import CardDisplayOnPageContext from "../context/cardDisplayOnPageContext";

const BurgerMenu = () => {
  //Current Selling Request Basket
  const { currentBasket } = useContext(SellingBasketContext);

  //Black Div control
  const { isBlackDivModalDisplayed, setIsBlackDivModalDisplayed } = useContext(
    BlackDivModalContext
  );

  //Is Menu Responsive Displayed
  const {
    isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed,
  } = useContext(isResponsiveMenuDisplayedContext);

  //Card Display control
  const { cardDisplayInformation, setCardDisplayInformation } = useContext(
    CardDisplayOnPageContext
  );

  const handleClick = (event) => {
    if (isResponsiveMenuDisplayed === "deactivated") {
      setIsResponsiveMenuDisplayed("activated");
      setIsBlackDivModalDisplayed("activated");
      setCardDisplayInformation({});
    } else {
      setIsResponsiveMenuDisplayed("deactivated");
      setIsBlackDivModalDisplayed("deactivated");
      setCardDisplayInformation({});
    }
  };

  return (
    <div className="burger-menu" onClick={(event) => handleClick(event)}>
      <img src="/pictures/burger-menu.png" alt="" />
      {currentBasket.length > 0 && (
        <div className="responsive-basket-quantity">
          {currentBasket.reduce((total, card) => {
            return total + card.quantity;
          }, 0)}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
