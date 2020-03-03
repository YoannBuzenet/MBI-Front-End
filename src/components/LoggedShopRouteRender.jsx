import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/authContext";
import { withRouter } from "react-router-dom";

const LoggedShopRouteRender = ({ path, component }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  component = withRouter(component);

  return authenticationInfos.user.roles.includes("ROLE_SHOP") ? (
    <Route path={path} render={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default LoggedShopRouteRender;
