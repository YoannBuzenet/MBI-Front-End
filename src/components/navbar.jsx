import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import SellingBasketContext from "../context/sellingBasket";

const Navbar = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current toggle menu state
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    setAuthenticationInfos({
      authenticationInfos: {
        isAuthenticated: false,
        userInfos: {
          id: "",
          email: "",
          roles: {}
        },
        customerInfos: {
          id: "",
          prenom: "",
          nom: "",
          tel: "",
          adress: "",
          postalCode: "",
          town: "",
          sellRequests: {}
        }
      }
    });
    history.replace("/");
  };

  console.log(authenticationInfos);

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
            <p>Logo Boutique</p>
          </Link>
          {authenticationInfos.isAuthenticated ? (
            <div className="my_options">
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
          ) : (
            <div className="connect">
              <Link
                className="classic-links nav-element"
                to="/my_selling_basket"
              >
                <p>
                  Mon Rachat (
                  <span className="buying-total">
                    {currentBasket.reduce((total, card) => {
                      return total + card.quantity;
                    }, 0)}
                  </span>
                  )
                </p>
              </Link>
              <Link className="classic-links" to="/register">
                <p>S'inscrire</p>
              </Link>
              <Link className="classic-links" to="/login">
                <p>Se connecter</p>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
