import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";

const MyShopAccount = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [shopAccountInformation, setShopAccountInformation] = useState({
    legalName: authenticationInfos.shop.legalName,
    shopmail: authenticationInfos.shop.email,
    siret: authenticationInfos.shop.SIRET,
    vatNumber: authenticationInfos.shop.vatNumber,
    tel: authenticationInfos.shop.tel,
    mail: authenticationInfos.shop.email,
    adress: authenticationInfos.shop.adress,
    postalCode: authenticationInfos.shop.postalCode,
    town: authenticationInfos.shop.town,
    buyingLegalClauses: null
  });

  console.log(authenticationInfos);

  const handleSubmit = () => console.log("hey");
  const handleChange = () => console.log("hey");

  return (
    <>
      <div className="container my-account">
        <h1>Informations Boutique</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Raison Sociale</label>
          <input
            type="text"
            id="legalName"
            name="legalName"
            required
            onChange={handleChange}
            value={shopAccountInformation.legalName}
          />

          <label htmlFor="lastName">Email de contact</label>
          <input
            type="mail"
            id="shopMail"
            name="shopMail"
            required
            onChange={handleChange}
            value={shopAccountInformation.mail}
          />

          <label htmlFor="tel">Telephone</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            required
            onChange={handleChange}
            value={shopAccountInformation.tel}
          />

          <label htmlFor="mail">SIRET</label>
          <input
            type="text"
            id="siret"
            name="siret"
            required
            onChange={handleChange}
            value={shopAccountInformation.siret}
          />

          <label htmlFor="mail">Numéro de TVA</label>
          <input
            type="text"
            id="vat-number"
            name="vat-number"
            required
            onChange={handleChange}
            value={shopAccountInformation.vatNumber}
          />

          <label htmlFor="adress">Adresse</label>
          <textarea
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            onChange={handleChange}
            value={shopAccountInformation.adress}
          ></textarea>

          <label htmlFor="postalCode">Code Postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            onChange={handleChange}
            value={shopAccountInformation.postalCode}
          />

          <label htmlFor="town">Ville</label>
          <input
            type="text"
            id="town"
            name="town"
            required
            onChange={handleChange}
            value={shopAccountInformation.town}
          />

          <label htmlFor="adress">Clauses de Rachat</label>
          <textarea
            name="buyingLegalClause"
            id="buyingLegalClause"
            cols="22"
            rows="3"
            required
            onChange={handleChange}
            value={shopAccountInformation.buyingLegalClauses}
          ></textarea>

          <button type="submit">Modifier mes informations</button>
        </form>
      </div>
    </>
  );
};

export default MyShopAccount;
