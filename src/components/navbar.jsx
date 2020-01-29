import React, { useState } from "react";

const Navbar = props => {
  const isConnected = true;

  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle && (
        <div className="unclick" onClick={() => setToggle(!toggle)}></div>
      )}
      <nav className="navbar">
        <div className="container">
          <p>Logo Boutique</p>
          {(isConnected && (
            <div className="my_options">
              <p className="unselectable" onClick={() => setToggle(!toggle)}>
                Prénom
                <span
                  className="arrow-menu unselectable"
                  onClick={() => setToggle(!toggle)}
                ></span>
              </p>
              {toggle && (
                <ul className="toggle-menu">
                  <li>Mon compte</li>
                  <li>Mes rachats</li>
                  <li>Déconnexion</li>
                </ul>
              )}
            </div>
          )) || (
            <ul className="connect">
              <li className="classic-links">S'inscrire</li>
              <li className="classic-links">Se connecter</li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
