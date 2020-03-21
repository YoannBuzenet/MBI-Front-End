import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

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
      .then(response => setCustomerData(response.data));

    console.log(customerData);

    return () => source.cancel("");
  }, []);

  useEffect(() => {
    console.log(customerData);
  }, [customerData]);

  return (
    <>
      <h1>
        {customerData && customerData.nom} {customerData && customerData.prenom}
      </h1>
      <div className="customer-infos">
        <p>Name : {customerData && customerData.nom}</p>
        <p>Prénom : {customerData && customerData.prenom}</p>
        <p>Email : {customerData && customerData.user.email}</p>
        <p>Tel : {customerData && customerData.tel}</p>
        <p>Adress : {customerData && customerData.adress}</p>
        <p>Postal Code : {customerData && customerData.postalCode}</p>
        <p>Town : {customerData && customerData.town}</p>
      </div>
      <div className="container">
        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>Numéro de Rachat</Th>
              <Th>Status</Th>
              <Th>Date Dernier Traitement</Th>
              <Th>Nombre de cartes</Th>
              <Th>Montant</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customerData &&
              customerData.sellrequest &&
              customerData.sellrequest.length > 0 &&
              customerData.sellrequest.map(sellRequest => {
                return (
                  <Tr
                    key={sellRequest.id}
                    className="cursor-pointer"
                    onClick={() =>
                      (window.location.href =
                        "/shopadmin/sell_requests/" + sellRequest.id)
                    }
                  >
                    <Td>{sellRequest.id}</Td>
                    <Td>
                      <StatusCalculator sellRequest={sellRequest} />
                    </Td>
                    <Td>
                      <LastInformationCalculator sellRequest={sellRequest} />
                    </Td>
                    <Td>{sellRequest.cardTotalQuantity}</Td>
                    <Td>{sellRequest.amount}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export default ShopAdminCustomer;
