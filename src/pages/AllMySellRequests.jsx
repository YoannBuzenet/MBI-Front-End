import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import StatusCalculator from "../components/StatusCalculator";
import moment from "moment";
import DateDisplayer from "../components/DateDisplayer";

const AllMySellRequests = props => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log(authenticationInfos.customer.SellRequests);

  // useEffect(() => {
  //   console.log(authenticationInfos.customer.SellRequests);
  // });

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
            <th>Date Validation</th>
            <th>Nombre de cartes</th>
            <th>Montant total</th>
          </tr>
        </thead>
        <tbody>
          {authenticationInfos.customer.SellRequests &&
            authenticationInfos.customer.SellRequests.length > 0 &&
            authenticationInfos.customer.SellRequests.map(
              (sellRequest, index) => (
                <tr key={sellRequest.id}>
                  <td>
                    <Link to={"/my_sell_requests/" + sellRequest.id}>
                      {sellRequest.id}
                    </Link>
                  </td>
                  <td>
                    <StatusCalculator sellRequest={sellRequest} />
                  </td>
                  <td>
                    <DateDisplayer dateToHandle={sellRequest.DateSubmit} />
                  </td>
                  <td>
                    <DateDisplayer dateToHandle={sellRequest.dateEnvoi} />
                  </td>
                  <td>
                    <DateDisplayer dateToHandle={sellRequest.dateRecu} />
                  </td>
                  <td>
                    <DateDisplayer dateToHandle={sellRequest.dateProcessing} />
                  </td>
                  <td>
                    <DateDisplayer
                      dateToHandle={sellRequest.dateApprovalPending}
                    />
                  </td>
                  <td>
                    <DateDisplayer dateToHandle={sellRequest.dateValidated} />
                  </td>
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
