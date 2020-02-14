import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import { Link } from "react-router-dom";

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
      <h1>Customer Page</h1>
      <div className="customer-infos">
        <p>Name : {customerData && customerData.nom}</p>
        <p>Prénom : {customerData && customerData.prenom}</p>
        <p>Email : {customerData && customerData.user.email}</p>
        <p>Tel : {customerData && customerData.tel}</p>
        <p>Adress : {customerData && customerData.adress}</p>
        <p>Postal Code : {customerData && customerData.postalCode}</p>
        <p>Town : {customerData && customerData.town}</p>
      </div>

      <table className="zebra-table">
        <thead>
          <tr>
            <th>Numéro de Rachat</th>
            <th>Status</th>
            <th>Date Dernier Traitement</th>
            <th>Nombre de cartes</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {customerData &&
            customerData.sellrequest &&
            customerData.sellrequest.length > 0 &&
            customerData.sellrequest.map(sellRequest => {
              return (
                <tr key={sellRequest.id}>
                  <td>
                    <Link to={"/shopadmin/sell_requests/" + sellRequest.id}>
                      {sellRequest.id}
                    </Link>
                  </td>
                  <td>
                    <StatusCalculator sellRequest={sellRequest} />
                  </td>
                  <td>
                    <LastInformationCalculator sellRequest={sellRequest} />
                  </td>
                  <td>{sellRequest.cardTotalQuantity}</td>
                  <td>{sellRequest.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ShopAdminCustomer;
