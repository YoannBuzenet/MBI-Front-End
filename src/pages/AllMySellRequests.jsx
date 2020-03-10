import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import StatusCalculator from "../components/StatusCalculator";
import moment from "moment";
import DateDisplayer from "../components/DateDisplayer";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

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
      <div className="container-table-responsive">
        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>Reference</Th>
              <Th>Status</Th>
              <Th>Date Soumission</Th>
              <Th>Date Envoi</Th>
              <Th>Date Réception</Th>
              <Th>Date Dernier traitement</Th>
              <Th>Date Attente Validation Client</Th>
              <Th>Date Validation</Th>
              <Th>Nombre de cartes</Th>
              <Th>Montant total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {authenticationInfos.customer.SellRequests &&
              authenticationInfos.customer.SellRequests.length > 0 &&
              authenticationInfos.customer.SellRequests.map(
                (sellRequest, index) => (
                  <Tr key={sellRequest.id}>
                    <Td>
                      <Link to={"/my_sell_requests/" + sellRequest.id}>
                        {sellRequest.id}
                      </Link>
                    </Td>
                    <Td>
                      <StatusCalculator sellRequest={sellRequest} />
                    </Td>
                    <Td>
                      <DateDisplayer dateToHandle={sellRequest.DateSubmit} />
                    </Td>
                    <Td>
                      <DateDisplayer dateToHandle={sellRequest.dateEnvoi} />
                    </Td>
                    <Td>
                      <DateDisplayer dateToHandle={sellRequest.dateRecu} />
                    </Td>
                    <Td>
                      <DateDisplayer
                        dateToHandle={sellRequest.dateProcessing}
                      />
                    </Td>
                    <Td>
                      <DateDisplayer
                        dateToHandle={sellRequest.dateApprovalPending}
                      />
                    </Td>
                    <Td>
                      <DateDisplayer dateToHandle={sellRequest.dateValidated} />
                    </Td>
                    <Td>{sellRequest.amount}</Td>
                    <Td>{sellRequest.cardTotalQuantity}</Td>
                  </Tr>
                )
              )}
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export default AllMySellRequests;
