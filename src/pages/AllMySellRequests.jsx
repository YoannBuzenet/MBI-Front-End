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

  useEffect(() => {
    console.log(authenticationInfos.customer.SellRequests);
  });

  return (
    <>
      <h1>Mes demandes de rachat</h1>
      <div className="container-table-responsive">
        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>Reference</Th>
              <Th>Status</Th>
              <Th>Soumission</Th>
              <Th>Envoi</Th>
              <Th>Réception</Th>
              <Th>Dernier traitement</Th>
              <Th>Attente Validation Client</Th>
              <Th>Validation</Th>
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
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        {sellRequest.id}
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <StatusCalculator sellRequest={sellRequest} />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <DateDisplayer
                          dateToHandle={sellRequest.DateSubmit.date}
                        />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <DateDisplayer
                          dateToHandle={
                            sellRequest.dateEnvoi
                              ? sellRequest.dateEnvoi.date
                              : sellRequest.dateEnvoi
                          }
                        />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <DateDisplayer dateToHandle={sellRequest.dateRecu} />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <DateDisplayer
                          dateToHandle={sellRequest.dateProcessing}
                        />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <DateDisplayer
                          dateToHandle={sellRequest.dateApprovalPending}
                        />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <DateDisplayer
                          dateToHandle={sellRequest.dateValidated}
                        />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        {sellRequest.amount}
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        {sellRequest.cardTotalQuantity}
                      </Link>
                    </Td>
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
