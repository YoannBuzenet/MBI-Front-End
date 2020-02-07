import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import userAPI from "../services/userAPI";

const MyAccount = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [accountInformation, setAccountInformation] = useState({
    firstName: authenticationInfos.customer.prenom,
    lastName: authenticationInfos.customer.nom,
    tel: authenticationInfos.customer.tel,
    mail: authenticationInfos.user.email,
    adress: authenticationInfos.customer.adress,
    postalCode: authenticationInfos.customer.postalCode,
    town: authenticationInfos.customer.town
  });

  const handleSubmit = async event => {
    event.preventDefault();

    //TODO :La liste des credentials semble etre plutot pour User plutot que Customer, à MAJ
    const credentials = {
      email: "string", //Empecher de modifier le mail en PUT customer ?
      roles: ["string"], //Empecher de modifier le role en PUT customer ?
      password: "string",
      shop: "string",
      client: "string",
      nickname: "string",
      pass: "string"
    };

    try {
      await userAPI.update(authenticationInfos.user.id, credentials);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = event => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setAccountInformation({
      ...accountInformation,
      [name]: value
    });
  };

  return (
    <>
      <div className="container my-account">
        <h1>Mon compte</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={handleChange}
            value={accountInformation.firstName}
          />

          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={handleChange}
            value={accountInformation.lastName}
          />

          <label htmlFor="tel">Telephone</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            required
            onChange={handleChange}
            value={accountInformation.tel}
          />

          <label htmlFor="mail">Email</label>
          <input
            type="mail"
            id="mail"
            name="mail"
            required
            onChange={handleChange}
            value={accountInformation.mail}
          />

          <label htmlFor="adress">Adresse</label>
          <textarea
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            onChange={handleChange}
            value={accountInformation.adress}
          ></textarea>

          <label htmlFor="postalCode">Code Postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            onChange={handleChange}
            value={accountInformation.postalCode}
          />

          <label htmlFor="town">Ville</label>
          <input
            type="text"
            id="town"
            name="town"
            required
            onChange={handleChange}
            value={accountInformation.town}
          />

          <button type="submit">Modifier mes informations</button>
        </form>
      </div>
    </>
  );
};

export default MyAccount;
