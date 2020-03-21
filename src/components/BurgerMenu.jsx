import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import BurgerMenuCustomerComponents from "./BurgerMenuCustomerComponents";
import BlackDiv from "./BlackDiv";
import isResponsiveMenuDisplayedContext from "../context/menuDisplayedContext";
import AuthContext from "../context/authContext";
import BurgerMenuShop from "./shop/BurgerMenuShop";

const BurgerMenu = ({ history }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

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
        <div className="responsive-basket-quantity">
          {currentBasket.reduce((total, card) => {
            return total + card.quantity;
          }, 0)}
        </div>
      )}
      {isResponsiveMenuDisplayed &&
        !authenticationInfos.user.roles.includes("ROLE_SHOP") && (
          <BurgerMenuCustomerComponents history={history} />
        )}
      {isResponsiveMenuDisplayed &&
        authenticationInfos.user.roles.includes("ROLE_SHOP") && (
          <BurgerMenuShop history={history} />
        )}
      {isResponsiveMenuDisplayed && <BlackDiv />}
    </div>
  );
};

export default BurgerMenu;
