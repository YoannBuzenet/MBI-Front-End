import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import SellingBasketContext from "../context/sellingBasket";
import authAPI from "../services/authAPI";
import BurgerMenu from "./BurgerMenu";
import { toast } from "react-toastify";

const Navbar = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current toggle menu state.
  const [toggleMenu, setToggleMenu] = useState(false);

  // console.log(authenticationInfos);

  const handleLogout = () => {
    authAPI.logout();
    setAuthenticationInfos({
      isAuthenticated: false,
      user: {
        id: "",
        email: "",
        roles: []
      },
      customer: {
        id: "",
        prenom: "",
        nom: "",
        tel: "",
        adress: "",
        postalCode: "",
        town: "",
        SellRequests: []
      }
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
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="classic-links">
            Logo Boutique
          </Link>
          <Link to="/" className="classic-links big-screen-info">
            Fantasy Sphere
          </Link>
          {authenticationInfos.isAuthenticated ? (
            <div className="my_options">
              <BurgerMenu history={history} />
              <div className="desktop_menu_options">
                <Link
                  className="classic-links nav-element"
                  to="/my_selling_basket"
                >
                  Mon Rachat (
                  <span className="buying-total">
                    {currentBasket.reduce((total, card) => {
                      return total + card.quantity;
                    }, 0)}
                  </span>
                  )
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
                        to="/my_sell_requests"
                        className="toggle-menu-links"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>Mes rachats</li>
                      </Link>

                      <li onClick={handleLogout}>Déconnexion</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="not-connected-options">
              <BurgerMenu history={history} />

              <div className="connect">
                <Link
                  className="classic-links nav-element"
                  to="/my_selling_basket"
                >
                  Mon Rachat (
                  <span className="buying-total">
                    {currentBasket.reduce((total, card) => {
                      return total + card.quantity;
                    }, 0)}
                  </span>
                  )
                </Link>
                <Link className="classic-links" to="/register">
                  S'inscrire
                </Link>
                <Link className="classic-links" to="/login">
                  Se connecter
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="margin-bottom"></div>
    </>
  );
};

export default Navbar;
