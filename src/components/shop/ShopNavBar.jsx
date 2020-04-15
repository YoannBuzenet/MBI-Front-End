import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import SellingBasketContext from "../../context/sellingBasket";
import authAPI from "../../services/authAPI";
import SearchCardBar from "../SearchCardBar";
import BurgerMenu from "../BurgerMenu";
import { toast } from "react-toastify";

const ShopNavbar = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log(authenticationInfos);

  // useEffect(() => {
  //   console.log(authenticationInfos);
  // });

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
    toast.success("Vous êtes bien déconnecté.");
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
            Accès Admin
            <Link to="/" className="classic-links">
              Site client
            </Link>
            <SearchCardBar />
          </div>

          <BurgerMenu history={history} />

          <Link
            className="classic-links nav-element options_desktop"
            to="/my_selling_basket"
          >
            Rachat (
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
              Rachats
            </Link>
            <Link
              className="classic-links nav-element"
              to="/shopadmin/customers"
            >
              Clients
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
                    <li>Mon compte</li>
                  </Link>
                  <Link
                    to="/shopadmin/shopInfos"
                    className="toggle-menu-links"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <li>Informations Boutique</li>
                  </Link>

                  <Link
                    to="/shopadmin/settings"
                    className="toggle-menu-links"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <li>Paramètres Gestion</li>
                  </Link>

                  <li onClick={handleLogout}>Déconnexion</li>
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
