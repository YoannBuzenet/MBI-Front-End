import React from "react";

// We add the display property in the item when we want it to display on the window.
// To remove it, just set the context as an empty Object.

export default React.createContext({
  cardDisplayInformation: {},
  setCardDisplayInformation: (value) => {},
});
