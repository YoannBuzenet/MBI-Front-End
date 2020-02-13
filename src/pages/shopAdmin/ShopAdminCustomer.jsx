import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";

const ShopAdminCustomer = ({ match }) => {
  const { id } = match.params;

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const [customerData, setCustomerData] = useState();

  useEffect(() => {
    customersAPI
      .findOneById(id, {
        cancelToken: source.token
      })
      .then(response => console.log(response));

    return () => source.cancel("");
  }, []);

  return (
    <>
      <h1>Customer Page</h1>
    </>
  );
};

export default ShopAdminCustomer;
