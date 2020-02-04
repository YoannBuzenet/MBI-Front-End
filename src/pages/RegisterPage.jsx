import React, { useState } from "react";
import authAPI from "../services/authAPI";
import Field from "../components/forms/Field";

const RegisterPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
    firstName: "",
    lastName: "",
    tel: "",
    adress: "",
    postalCode: "",
    town: ""
  });

  const handleSubmit = async event => {
    history.replace("/");
    event.preventDefault();

    try {
      await authAPI.register(credentials);

      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = event => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({
      ...credentials,
      [name]: value
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

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
