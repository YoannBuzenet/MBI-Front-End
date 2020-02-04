import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/authContext";

const LoggedShopRoute = ({ path, component }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default LoggedShopRoute;
