import React, { useState } from "react";
import userAPI from "../services/userAPI";
import Field from "../components/forms/Field";
import { ToastContainer, toast } from "react-toastify";
import config from "../services/config";

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

  const handleSubmit = async (event) => {
    history.replace("/");
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

      history.replace("/");
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue. Merci de réessayer.");
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
        <form action="" onSubmit={handleSubmit}>
          <Field
            name="mail"
            type="mail"
            id="mail"
            required
            onChange={handleChange}
            label="Email"
          />

          <Field
            name="password"
            type="password"
            id="password"
            required
            onChange={handleChange}
            label="Mot de Passe"
          />

          <Field
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={handleChange}
            label="Prénom"
          />

          <Field
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={handleChange}
            label="Nom de Famille"
          />

          <Field
            type="tel"
            id="tel"
            name="tel"
            required
            onChange={handleChange}
            label="Telephone"
          />

          <label htmlFor="adress">Adresse</label>
          <textarea
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            onChange={handleChange}
          ></textarea>

          <Field
            name="postalCode"
            type="text"
            id="postalCode"
            required
            onChange={handleChange}
            label="Code Postal"
          />

          <Field
            name="town"
            type="text"
            id="town"
            required
            onChange={handleChange}
            label="Ville"
          />

          <button type="submit" className="connecting-button">
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
