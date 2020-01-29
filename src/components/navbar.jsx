import React, { useState } from "react";

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
          <p>Logo Boutique</p>
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
              <p className="classic-links">S'inscrire</p>
              <p className="classic-links">Se connecter</p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
