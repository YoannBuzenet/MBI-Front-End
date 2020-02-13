import React from "react";

const ShopAdminOneSellRequest = ({ match }) => {
  const { id } = match.params;

  console.log(id);
  return (
    <>
      <h1>One Sell Request</h1>
    </>
  );
};

export default ShopAdminOneSellRequest;
