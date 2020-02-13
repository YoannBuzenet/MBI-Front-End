import React from "react";
import OneSellRequest from "../pages/OneSellRequest";

const BigListPureComponent = props => (
  <div>
    <OneSellRequest />
  </div>
);
BigListPureComponent.whyDidYouRender = true;

export default BigListPureComponent;
