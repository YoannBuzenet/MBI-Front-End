import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import SellingBasketContext from "../../context/sellingBasket";
import authAPI from "../../services/authAPI";
import SearchCardBar from "../SearchCardBar";
import BurgerMenu from "../BurgerMenu";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const ShopNavbar = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  // console.log(authenticationInfos);
  // console.log(new Date().getTime());

  //Current Selling Request Basket
  const { currentBasket } = useContext(SellingBasketContext);

  //Current toggle menu state.
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
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
    toast.success(
      <FormattedMessage
        id="app.shop.navBar.logout.success"
        defaultMessage={`You logged out successfully.`}
      />
    );

    history.replace("/");
  };

  return (
    <>
      {toggleMenu && (
        <div
          className="unclick"
          onClick={() => setToggleMenu(!toggleMenu)}
        ></div>
      )}
      <nav className="navbar navbar-admin">
        <div className="container">
          <div className="menu-links-left">
            <FormattedMessage
              id="app.shop.navBar.title"
              defaultMessage={`Admin Access`}
            />
            <Link to="/" className="classic-links">
              <FormattedMessage
                id="app.shop.navBar.clientWebsite"
                defaultMessage={`Cust. Access`}
              />
            </Link>
            <SearchCardBar history={history} />
          </div>

          <BurgerMenu history={history} />

          <Link
            className="classic-links nav-element options_desktop"
            to="/my_selling_basket"
          >
            <FormattedMessage
              id="app.shop.navBar.sellRequest"
              defaultMessage={`Sell Request`}
            />
            (
            <span className="buying-total">
              {currentBasket.reduce((total, card) => {
                return total + card.quantity;
              }, 0)}
            </span>
            )
          </Link>

          <div className="my_options options_desktop">
            {/* <Link className="classic-links nav-element" to="/shopadmin/cards">
              Cartes
            </Link> */}
            <Link
              className="classic-links nav-element"
              to="/shopadmin/sell_requests"
            >
              <FormattedMessage
                id="app.shop.navBar.sellRequests"
                defaultMessage={`Sell Requests`}
              />
            </Link>
            <Link
              className="classic-links nav-element"
              to="/shopadmin/customers"
            >
              <FormattedMessage
                id="app.shop.navBar.customers"
                defaultMessage={`Customers`}
              />
            </Link>
            <div className="toggle-menu-container">
              <p
                className="unselectable display-inline-block nav-element pointer"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                {authenticationInfos.customer.prenom}
                <span
                  className="arrow-menu unselectable"
                  onClick={() => setToggleMenu(!toggleMenu)}
                ></span>
              </p>
              {toggleMenu && (
                <ul className="toggle-menu">
                  <Link
                    to="/my_account"
                    className="toggle-menu-links"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <li>
                      <FormattedMessage
                        id="app.shop.navBar.myAccount"
                        defaultMessage={`My Account`}
                      />
                    </li>
                  </Link>
                  <Link
                    to="/shopadmin/shopInfos"
                    className="toggle-menu-links"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <li>
                      <FormattedMessage
                        id="app.shop.navBar.shopInfos"
                        defaultMessage={`Shop Informations`}
                      />
                    </li>
                  </Link>

                  <Link
                    to="/my_sell_requests"
                    className="toggle-menu-links"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <li>
                      <FormattedMessage
                        id="app.navbar.mySellRequests"
                        defaultMessage={`My Sell Requests`}
                      />
                    </li>
                  </Link>

                  <Link
                    to="/shopadmin/settings"
                    className="toggle-menu-links"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <li>
                      <FormattedMessage
                        id="app.shop.navBar.settings"
                        defaultMessage={`Settings`}
                      />
                    </li>
                  </Link>

                  <li onClick={handleLogout}>
                    <FormattedMessage
                      id="app.shop.navBar.logOut"
                      defaultMessage={`Log Out`}
                    />
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="margin-bottom"></div>
    </>
  );
};

export default ShopNavbar;
