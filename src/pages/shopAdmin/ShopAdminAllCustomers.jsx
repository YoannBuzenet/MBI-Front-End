import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";

const ShopAdminAllCustomers = props => {
  const [listCustomers, setListCustomers] = useState([]);

  //Preparing the variable that allow Promises clean up on Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    customersAPI
      .findAll({
        cancelToken: source.token
      })
      .then(response => setListCustomers(response));
    console.log("hey");

    return () => source.cancel("");
  }, []);
  return (
    <>
      <h1>Customers</h1>
      <table className="zebra-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Nombre de Rachats</th>
          </tr>
        </thead>
        <tbody>
          {listCustomers.length > 0 &&
            listCustomers.map(customer => {
              console.log(customer);

              return (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.nom}</td>
                  <td>{customer.prenom}</td>
                  <td>{customer.sellrequest.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ShopAdminAllCustomers;
