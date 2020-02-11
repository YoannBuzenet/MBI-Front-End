import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const AllMySellRequests = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  useEffect(() => {
    console.log(authenticationInfos);
  });

  return (
    <>
      <h1>Mes demandes de rachat</h1>
      <table className="zebra-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Status</th>
            <th>Date Soumission</th>
            <th>Date Envoi</th>
            <th>Date Réception</th>
            <th>Date Dernier traitement</th>
            <th>Date Attente Validation Client</th>
            <th>Date Annulation</th>
            <th>Nombre de cartes</th>
            <th>Montant total</th>
          </tr>
        </thead>
        <tbody>
          {authenticationInfos.customer.SellRequests.length > 0 &&
            authenticationInfos.customer.SellRequests.map(
              (sellRequest, index) => (
                <tr key={index}>
                  <td>{sellRequest.id}</td>
                  <td>statut</td>
                  <td>Date soumission</td>
                  <td>{sellRequest.dateEnvoi || "A venir"}</td>
                  <td>{sellRequest.dateRecu || "A venir"}</td>
                  <td>{sellRequest.dateProcessing || "A venir"}</td>
                  <td>{sellRequest.dateValidated || "A venir"}</td>
                  <td>{sellRequest.dateApprovalPending || "A venir"}</td>
                  <td>{sellRequest.amount}</td>
                  <td>{sellRequest.cardTotalQuantity}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  );
};

export default AllMySellRequests;
