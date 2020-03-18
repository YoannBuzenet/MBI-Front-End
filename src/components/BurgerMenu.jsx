import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import BurgerMenuComponents from "./BurgerMenuComponents";
import BlackDiv from "./BlackDiv";
import isResponsiveMenuDisplayedContext from "../context/menuDisplayedContext";

const BurgerMenu = ({ history }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Is Menu Responsive Displayed
  const {
    isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed
  } = useContext(isResponsiveMenuDisplayedContext);

  const handleClick = event => {
    setIsResponsiveMenuDisplayed(!isResponsiveMenuDisplayed);
    // return console.log(event);
  };

  return (
    <div className="burger-menu" onClick={event => handleClick(event)}>
      <img src="/pictures/burger-menu.png" alt="" />
      {currentBasket.length > 0 && (
        <div className="responsive-basket-quantity">{currentBasket.length}</div>
      )}
      {isResponsiveMenuDisplayed && <BurgerMenuComponents history={history} />}
      {isResponsiveMenuDisplayed && <BlackDiv />}
    </div>
  );
};

export default BurgerMenu;
