import React from "react";

export default React.createContext({
  authenticationInfos: {
    exp: "",
    isAuthenticated: false,
    user: {
      id: "",
      email: "",
      roles: {}
    },
    customer: {
      id: "",
      prenom: "",
      nom: "",
      tel: "",
      adress: "",
      postalCode: "",
      town: "",
      sellRequests: {}
    }
  },
  setAuthenticationInfos: value => {}
});
