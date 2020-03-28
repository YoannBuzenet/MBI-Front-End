import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import SellingBasketContext from "../../context/sellingBasket";
import authAPI from "../../services/authAPI";
import { toast } from "react-toastify";

const BurgerMenuShop = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Current Selling Request Basket
  const { currentBasket } = useContext(SellingBasketContext);

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

            {/* <Link
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              to="/shopadmin/cards"
            >
              <li>Cartes</li>
            </Link> */}
            <Link
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              to="/shopadmin/sell_requests"
            >
              <li>Rachats</li>
            </Link>
            <Link
              className="classic_links_responsive classic_links_responsive_admin nav-element"
              to="/shopadmin/customers"
            >
              <li>Clients</li>
            </Link>

            <Link
              to="/my_account"
              className="classic_links_responsive classic_links_responsive_admin"
            >
              <li>Mon compte</li>
            </Link>

            <Link
              to="/shopadmin/shopInfos"
              className="classic_links_responsive classic_links_responsive_admin nav-element"
            >
              <li>Informations Boutique</li>
            </Link>

            <Link
              to="/shopadmin/settings"
              className="classic_links_responsive classic_links_responsive_admin nav-element"
            >
              <li>Paramètres Gestion</li>
            </Link>

            <li
              onClick={handleLogout}
              className="classic_links_responsive classic_links_responsive_admin"
            >
              Déconnexion
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BurgerMenuShop;
