import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import SellingBasketContext from "../context/sellingBasket";
import authAPI from "../services/authAPI";

const BurgerMenuComponents = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current toggle menu state.
  const [toggleMenu, setToggleMenu] = useState(false);

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

    history.replace("/");
  };

  return (
    <>
      {authenticationInfos.isAuthenticated ? (
        <div className="my_options">
          <Link className="classic-links nav-element" to="/my_selling_basket">
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
        <div className="not-connected-options">
          <div className="connect">
            <Link className="classic-links nav-element" to="/my_selling_basket">
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
      sss
    </>
  );
};

export default BurgerMenuComponents;
