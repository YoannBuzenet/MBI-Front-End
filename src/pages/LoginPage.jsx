import React, { useState, useContext } from "react";
import authAPI from "../services/authAPI";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import LoginLogOutContext from "../context/logAutoRenewOrLogout";
import config from "../services/config";

const LoginPage = ({ history, eraseAuthContext, renewJWTToken }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  //Timers control for auto login renew or auto logout
  const { timers, setTimers } = useContext(LoginLogOutContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // console.log(eraseAuthContext);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    //Remove that line when going live
    // setIsAuthenticated(true);
    event.preventDefault();
    try {
      const userData = await authAPI.authenticate(credentials);
      console.log(userData);
      setError("");
      setAuthenticationInfos(userData);
      toast.success("Vous êtes connecté.");

      clearTimeout(timers.autoRenew);
      clearTimeout(timers.autoLogOut);

      setTimers({
        autoRenew: setTimeout(renewJWTToken, config.TIME_JWT_RENEW),
        autoLogOut: setTimeout(eraseAuthContext, config.TIME_TO_LOG_OUT),
      });

      if (userData.user.roles.includes("ROLE_SHOP")) {
        history.replace("/shopadmin/sell_requests");
      } else {
        history.goBack();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      //PARSE THE ERROR BEFORE SETTING IT
      console.log(error);
      toast.error(
        "Le login ou le mot de passe est incorrect. Merci de réessayer."
      );
    }
  };

  return (
    <>
      <div className="login-page">
        <div>
          <h1>Connexion à l'application</h1>

          <form action="" onSubmit={handleSubmit} className="login-form">
            <Field
              name="email"
              label="Adresse e-mail"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Adresse e-mail..."
              error={error}
              className="form-group"
              required
            />

            <Field
              name="password"
              type="password"
              label="Password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              error=""
              required
            />
            <div className="form-group">
              <button type="submit" className="connecting-button">
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
