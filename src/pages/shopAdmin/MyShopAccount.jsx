import React, { useContext } from "react";
import AuthContext from "../../context/authContext";

const MyShopAccount = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log(authenticationInfos);

  return <>Shop Account </>;
};

export default MyShopAccount;
