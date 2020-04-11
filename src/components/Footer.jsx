import React from "react";
import shopInfoContext from "../context/publicShopInfoContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { shopInfos } = useContext(shopInfoContext);

  return (
    <>
      <footer className="footer">
        <div className="footer-container container">
          <div>
            <p>
              <Link to="/buyingClauses">Conditions Générales de Vente</Link>
            </p>
          </div>
          <div>
            <p>{shopInfos.legalName}</p>
            <p className="small-text">{shopInfos.adress}</p>
            <p className="small-text">
              {shopInfos.postalCode} {shopInfos.town}
            </p>
          </div>
          <div>
            <p>{shopInfos.tel}</p>
            <p>{shopInfos.email}</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
