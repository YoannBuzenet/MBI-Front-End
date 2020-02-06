import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/authContext";

const LoggedRoute = ({ path, component }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  return authenticationInfos.isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default LoggedRoute;
