import React from "react";

export default React.createContext({
  canSubmit: true,
  setCanSubmit: value => {}
});
