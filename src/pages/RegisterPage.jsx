import React, { useState } from "react";
import userAPI from "../services/userAPI";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import config from "../services/config";
import CSSLoaderWaitingSpiral from "../components/loaders/CSSLoaderWaitingSpiral";

const RegisterPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
    firstName: "",
    lastName: "",
    tel: "",
    adress: "",
    postalCode: "",
    town: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      //Object creation to remake with destructuration, to keep up with async
      const jsonToSend = {
        email: credentials.mail,
        pass: credentials.password,
        client: {
          nom: credentials.lastName,
          prenom: credentials.firstName,
          adress: credentials.adress,
          postalCode: credentials.postalCode,
          town: credentials.town,
          tel: credentials.tel,
          shop: "/shops/" + config.shopID,
        },
      };
      await userAPI.register(jsonToSend);
      toast.success("Votre compte a bien été créé.");

      // console.log(jsonToSend);
      setIsLoading(false);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        setIsLoading(false);
        // console.log(error.response.data["hydra:description"]);
        if (
          error.response.data["hydra:description"] ===
          "email: This value is already used."
        ) {
          toast.error("Cet email est déjà pris.");
        } else {
          console.log(error.response.data);
          toast.error("Une erreur est survenue. Merci de réessayer.");
        }
      }
    }
  };

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container my-account">
        <h1>S'inscrire</h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Field
            name="mail"
            type="email"
            id="mail"
            required
            onChange={(event) => handleChange(event)}
            label="Email"
          />

          <Field
            name="password"
            type="password"
            id="password"
            required
            onChange={(event) => handleChange(event)}
            label="Mot de Passe"
            minlength={6}
          />

          <Field
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={(event) => handleChange(event)}
            label="Prénom"
          />

          <Field
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={(event) => handleChange(event)}
            label="Nom de Famille"
          />

          <Field
            type="tel"
            id="tel"
            name="tel"
            required
            onChange={(event) => handleChange(event)}
            label="Telephone"
          />

          <label htmlFor="adress">Adresse</label>
          <textarea
            className="my-account"
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            onChange={(event) => handleChange(event)}
          ></textarea>

          <Field
            name="postalCode"
            type="text"
            id="postalCode"
            required
            onChange={(event) => handleChange(event)}
            label="Code Postal"
          />

          <Field
            name="town"
            type="text"
            id="town"
            required
            onChange={(event) => handleChange(event)}
            label="Ville"
          />
          {isLoading && (
            <div className="RegisterLoader">
              <CSSLoaderWaitingSpiral />
            </div>
          )}
          {!isLoading && (
            <button type="submit" className="connecting-button">
              S'inscrire
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
