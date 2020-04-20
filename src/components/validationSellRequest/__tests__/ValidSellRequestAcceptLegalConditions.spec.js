import React from "react";
import ReactDOM from "react-dom";
import ValidSellRequestAcceptLegalConditions from "../ValidSellRequestAcceptLegalConditions";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ValidSellRequestAcceptLegalConditions />, div);
});
