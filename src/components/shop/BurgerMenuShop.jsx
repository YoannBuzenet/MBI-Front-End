import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import SellingBasketContext from "../../context/sellingBasket";
import authAPI from "../../services/authAPI";
import { toast } from "react-toastify";
import BlackDivContext from "../../context/blackDivModalContext";
import isResponsiveMenuDisplayedContext from "../../context/menuDisplayedContext";
import { FormattedMessage } from "react-intl";

const BurgerMenuShop = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Current Selling Request Basket
  const { currentBasket } = useContext(SellingBasketContext);

  //Black Div control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  //Responsive Menu control
  const { setIsResponsiveMenuDisplayed } = useContext(
    isResponsiveMenuDisplayedContext
  );

  const closeMenu = (event) => {
    setIsBlackDivModalDisplayed("deactivated");
    setIsResponsiveMenuDisplayed("deactivated");
  };

  const handleLogout = () => {
    history.replace("/");
    authAPI.logout();
    setAuthenticationInfos({
      isAuthenticated: false,
      user: {
        id: "",
        email: "",
        roles: [],
      },
      customer: {
        id: "",
        prenom: "",
        nom: "",
        tel: "",
        adress: "",
        postalCode: "",
        town: "",
        SellRequests: [],
      },
    });
    toast.success("Vous êtes bien déconnecté.");
  };

  return (
    <>
      <div className="responsive_menu responsive_menu_admin">
        <h2 className="surname_responsive">
          {authenticationInfos.customer.prenom}
        </h2>
        <span className="divider">
          <hr></hr>
        </span>
        <div className="">
          <ul className="">
            <Link
              className="classic_links_responsive classic_links_responsive_admin"
              to="/my_selling_basket"
              onClick={(event) => closeMenu(event)}
            >
              <li>
                <FormattedMessage
                  id="app.shop.burgerMenu.mySellRequest"
                  defaultMessage={`My Sell Request`}
                />
                (
                <span className="buying-total">
                  {currentBasket.reduce((total, card) => {
                    return total + card.quantity;
                  }, 0)}
                </span>
                )
              </li>
            </Link>

            {/* <Link
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              to="/shopadmin/cards"
            >
              <li>Cartes</li>
            </Link> */}
            <Link
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              to="/shopadmin/sell_requests"
              onClick={(event) => closeMenu(event)}
            >
              <li>
                <FormattedMessage
                  id="app.shop.burgerMenu.sellRequests"
                  defaultMessage={`SellRequests`}
                />
              </li>
            </Link>
            <Link
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              to="/shopadmin/customers"
              onClick={(event) => closeMenu(event)}
            >
              <li>
                <FormattedMessage
                  id="app.shop.burgerMenu.customers"
                  defaultMessage={`Customers`}
                />
              </li>
            </Link>

            <Link
              to="/my_account"
              className="classic_links_responsive classic_links_responsive_admin"
              onClick={(event) => closeMenu(event)}
            >
              <li>
                <FormattedMessage
                  id="app.shop.burgerMenu.myAccount"
                  defaultMessage={`My Account`}
                />
              </li>
            </Link>

            <Link
              to="/shopadmin/shopInfos"
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              onClick={(event) => closeMenu(event)}
            >
              <li>
                <FormattedMessage
                  id="app.shop.burgerMenu.shopInfos"
                  defaultMessage={`Shop Informations`}
                />
              </li>
            </Link>

            <Link
              to="/shopadmin/settings"
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              onClick={(event) => closeMenu(event)}
            >
              <li>
                <FormattedMessage
                  id="app.shop.burgerMenu.shopSettings"
                  defaultMessage={`Settings`}
                />
              </li>
            </Link>

            <li
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="classic_links_responsive classic_links_responsive_admin"
            >
              <FormattedMessage
                id="app.shop.burgerMenu.logOut"
                defaultMessage={`Log Out`}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BurgerMenuShop;
