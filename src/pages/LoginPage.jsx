import React, { useState, useContext } from "react";
import axios from "axios";
import authAPI from "../services/authAPI";
import AuthContext from "../context/authContext";
import Field from "../components/forms/Field";

const LoginPage = ({ onLogin, history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [credentials, setCredentials] = useState({
    email: "",
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
    //Remove that line when going live
    // setIsAuthenticated(true);
    event.preventDefault();
    try {
      const userData = await authAPI.authenticate(credentials);

      setError("");
      setAuthenticationInfos(userData);

      history.replace("/");
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
          name="email"
          label="Adresse e-mail"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Adresse e-mail..."
          error={error}
        />

        <Field
          name="password"
          type="password"
          label="Password"
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
