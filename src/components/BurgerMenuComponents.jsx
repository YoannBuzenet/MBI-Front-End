import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import SellingBasketContext from "../context/sellingBasket";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";

const BurgerMenuComponents = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

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

  const classMenu = authenticationInfos.isAuthenticated
    ? "responsive_menu authenticated-menu"
    : "responsive_menu";

  return (
    <div className={classMenu}>
      {authenticationInfos.isAuthenticated ? (
        <div className="my_options_responsive">
          <h2 className="surname_responsive">
            {authenticationInfos.customer.prenom}
          </h2>
          <span className="divider">
            <hr></hr>
          </span>
          <div className="">
            <ul className="">
              <Link
                className="classic_links_responsive"
                to="/my_selling_basket"
              >
                <li>
                  Mon Rachat (
                  <span className="buying-total">
                    {currentBasket.reduce((total, card) => {
                      return total + card.quantity;
                    }, 0)}
                  </span>
                  )
                </li>
              </Link>

              <Link to="/my_account" className="classic_links_responsive">
                <li>Mon compte</li>
              </Link>

              <Link to="/my_sell_requests" className="classic_links_responsive">
                <li>Mes rachats</li>
              </Link>

              <li onClick={handleLogout} className="classic_links_responsive">
                Déconnexion
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="not_connected_options_responsive">
          <div className="connection">
            <Link
              className="classic_links_responsive nav-element"
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
            <Link className="classic_links_responsive" to="/register">
              S'inscrire
            </Link>
            <Link className="classic_links_responsive" to="/login">
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenuComponents;
