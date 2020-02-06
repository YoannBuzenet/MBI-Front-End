import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/authContext";

const LoggedShopRoute = ({ path, component }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  //Ajouter is shop ?
  return authenticationInfos.isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default LoggedShopRoute;
