import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import TableLoader from "../../components/loaders/TableLoader";

const ShopAdminAllCustomers = props => {
  const [listCustomers, setListCustomers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //Preparing the variable that allow Promises clean up on Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    if (listCustomers.length === 0) {
      customersAPI
        .findAll({
          cancelToken: source.token
        })
        .then(response => setListCustomers(response))
        .then(() => setIsLoading(false));
      console.log("hey");

      return () => source.cancel("");
    }
  }, [listCustomers]);
  return (
    <>
      <h1>Customers</h1>
      <div className="container">
        {isLoading && <TableLoader />}
        {!isLoading && (
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <Th>Reference</Th>
                <Th>Nom</Th>
                <Th>Prénom</Th>
                <Th>Nombre de Rachats</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listCustomers.length > 0 &&
                listCustomers.map(customer => {
                  // console.log(customer);

                  return (
                    <Tr
                      key={customer.id}
                      onClick={() =>
                        (window.location.href =
                          "/shopadmin/customers/" + customer.id)
                      }
                      className="cursor-pointer"
                    >
                      <Td>{customer.id}</Td>

                      <Td>{customer.nom}</Td>
                      <Td>{customer.prenom}</Td>
                      <Td>{customer.sellrequest.length}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default ShopAdminAllCustomers;
