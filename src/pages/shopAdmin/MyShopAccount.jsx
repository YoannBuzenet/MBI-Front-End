import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import Field from "../../components/forms/Field";
import shopAPI from "../../services/shopAPI";

const MyShopAccount = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //ENV VARIABLE
  const shopID = 1;

  //We add a timer to not hit API at each user input.
  //This way there is at least WAIT_INTERVAL interval between each sending, or more if the user continues to input.
  const WAIT_INTERVAL = 1000;
  const [timer, setTimer] = useState(null);

  console.log(authenticationInfos);

  const handleChange = event => {
    setTimer(clearTimeout(timer));

    var { name, value } = event.target;

    const contextCopy = { ...authenticationInfos };
    contextCopy.shop[name] = value;

    setAuthenticationInfos(contextCopy);

    setTimer(setTimeout(() => triggerAPISending(name, value), WAIT_INTERVAL));
  };

  const triggerAPISending = (name, value) => {
    console.log("lol");
    const objectToSend = {
      shop: {
        [name]: value
      }
    };
    console.log(objectToSend);
    shopAPI.updateFields(objectToSend, shopID).then(data => console.log(data));
  };

  return (
    <>
      <div className="container my-account">
        <h1>Informations Boutique</h1>
        <form>
          <Field
            name="legalName"
            label="Raison sociale"
            value={authenticationInfos.shop.legalName}
            onChange={event => handleChange(event, "TODOBRO")}
            placeholder="Merci d'indiquer la raison sociale de votre entreprise."
            idNumber={Math.random()}
          />
          <Field
            name="email"
            label="Email"
            value={authenticationInfos.shop.email}
            onChange={event => handleChange(event, "TODOBRO")}
            placeholder="Votre mail de contact professionnel."
            type="mail"
            idNumber={Math.random()}
          />

          <Field
            name="tel"
            label="Telephone"
            value={authenticationInfos.shop.tel}
            onChange={event => handleChange(event, "TODOBRO")}
            placeholder="Votre numéro de téléphone professionnel."
            type="tel"
            idNumber={Math.random()}
          />
          <Field
            name="SIRET"
            label="SIRET"
            value={authenticationInfos.shop.SIRET}
            onChange={event => handleChange(event, "TODOBRO")}
            placeholder="Votre numéro de SIRET."
            idNumber={Math.random()}
          />
          <Field
            name="vatNumber"
            label="Numéro de TVA"
            value={authenticationInfos.shop.SIRET}
            onChange={event => handleChange(event, "TODOBRO")}
            placeholder="Votre numéro de TVA"
            idNumber={Math.random()}
          />

          <label htmlFor="adress">Adresse</label>
          <textarea
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            onChange={event => handleChange(event, "TODOBRO")}
            value={authenticationInfos.shop.adress}
          ></textarea>

          <Field
            name="postalCode"
            label="Code Postal"
            value={authenticationInfos.shop.postalCode}
            onChange={event => handleChange(event, "TODOBRO")}
            placeholder="Votre adresse code postal."
            idNumber={Math.random()}
          />
          <Field
            name="town"
            label="Ville"
            value={authenticationInfos.shop.town}
            onChange={event => handleChange(event, "TODOBRO")}
            placeholder="Votre ville."
            idNumber={Math.random()}
          />

          <label htmlFor="legalClausesBuying">Clauses de Rachat</label>
          <textarea
            name="legalClausesBuying"
            id="legalClausesBuying"
            cols="22"
            rows="3"
            required
            onChange={event => handleChange(event, "TODOBRO")}
            value={authenticationInfos.shop.legalClausesBuying}
          ></textarea>
        </form>
      </div>
    </>
  );
};

export default MyShopAccount;
