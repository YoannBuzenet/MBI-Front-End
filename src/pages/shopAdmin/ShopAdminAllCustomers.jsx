import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";

const ShopAdminAllCustomers = props => {
  const [listCustomers, setListCustomers] = useState([]);

  useEffect(() => {
    console.log(axios.defaults.headers);
    customersAPI.findAll().then(response => setListCustomers(response));
    console.log("hey");
  }, []);
  return (
    <>
      <h1>Customers</h1>
      {listCustomers.length > 0 && listCustomers.map(customer => "lol")}
    </>
  );
};

export default ShopAdminAllCustomers;
