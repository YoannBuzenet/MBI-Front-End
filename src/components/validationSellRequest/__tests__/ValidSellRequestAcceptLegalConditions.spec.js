import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ValidSellRequestAcceptLegalConditions from "../ValidSellRequestAcceptLegalConditions";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ValidSellRequestAcceptLegalConditions />, div);
});

it("renders its UI correctly", () => {
  const validationComponent = renderer
    .create(<ValidSellRequestAcceptLegalConditions />)
    .toJSON();
  expect(validationComponent).toMatchSnapshot();
});
