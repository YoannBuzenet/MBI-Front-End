import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const isConnected = false;

  const [toggleMenu, setToggleMenu] = useState(false);
  const [loginWindow, setToggleLoginWindow] = useState(false);

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
          {(isConnected && (
            <div className="my_options">
              <p
                className="unselectable"
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
                  <li>Mon compte</li>
                  <li>Mes rachats</li>
                  <li>Déconnexion</li>
                </ul>
              )}
            </div>
          )) || (
            <div className="connect">
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
