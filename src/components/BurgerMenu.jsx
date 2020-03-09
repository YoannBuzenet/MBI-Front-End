import React, { useContext, useState } from "react";
import SellingBasketContext from "../context/sellingBasket";
import BurgerMenuComponents from "./BurgerMenuComponents";

const BurgerMenu = ({ history }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Is responsive menu displayed ?
  const [isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed] = useState(
    false
  );

  const handleClick = event => {
    setIsResponsiveMenuDisplayed(!isResponsiveMenuDisplayed);
    return console.log(event);
  };

  return (
    <div className="burger-menu" onClick={event => handleClick(event)}>
      <img src="/pictures/burger-menu.png" alt="" />
      {currentBasket.length > 0 && (
        <div className="responsive-basket-quantity">{currentBasket.length}</div>
      )}
      {isResponsiveMenuDisplayed && <BurgerMenuComponents history={history} />}
    </div>
  );
};

export default BurgerMenu;
