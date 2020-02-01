import React, { useState, useContext } from "react";
import axios from "axios";
import authAPI from "../services/authAPI";
import AuthContext from "../context/authContext";
import Field from "../components/forms/Field";

const LoginPage = ({ onLogin, history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = event => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async event => {
    setIsAuthenticated(true);
    event.preventDefault();
    try {
      await authAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      history.replace("/customers");
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse, ou alors les informations ne correspondent pas."
      );
    }
  };

  return (
    <>
      <h1>Connexion à l'application</h1>

      <form action="" onSubmit={handleSubmit}>
        <Field
          name="username"
          label="Adresse e-mail"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Adresse e-mail..."
          error={error}
        />

        <Field
          name="password"
          type="password"
          label="Adresse e-mail"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          error=""
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Je me connecte
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
