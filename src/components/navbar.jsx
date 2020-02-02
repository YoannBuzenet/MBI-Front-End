import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const Navbar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [loginWindow, setToggleLoginWindow] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
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
            <p>Logo Boutique</p>
          </Link>
          {(isAuthenticated && (
            <div className="my_options">
              <Link
                className="classic-links nav-element"
                to="/my_selling_basket"
              >
                Mon Rachat (<span className="buying-total">0</span>)
              </Link>
              <div className="toggle-menu-container">
                <p
                  className="unselectable display-inline-block nav-element"
                  onClick={() => setToggleMenu(!toggleMenu)}
                >
                  Prénom
                  <span
                    className="arrow-menu unselectable"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  ></span>
                </p>
                {toggleMenu && (
                  <ul className="toggle-menu">
                    <li>
                      <Link to="/my_account" className="toggle-menu-links">
                        Mon compte
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my_sell_requests"
                        className="toggle-menu-links"
                      >
                        Mes rachats
                      </Link>
                    </li>
                    <li onClick={handleLogout}>Déconnexion</li>
                  </ul>
                )}
              </div>
            </div>
          )) || (
            <div className="connect">
              <Link className="classic-links" to="/my_selling_basket">
                <p>
                  Mon Rachat (<span className="buying-total">0</span>)
                </p>
              </Link>
              <Link className="classic-links">
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
