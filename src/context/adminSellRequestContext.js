import React from "react";

export default React.createContext({
  currentAdminSellRequest: {
    sellRequests: []
  },
  setCurrentAdminSellRequest: value => {}
});
