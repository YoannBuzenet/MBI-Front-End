import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import StatusCalculator from "../components/StatusCalculator";
import { FormattedMessage } from "react-intl";
import DateDisplayer from "../components/DateDisplayer";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useHistory } from "react-router-dom";

const AllMySellRequests = (props) => {
  //Current Authentication
  const { authenticationInfos } = useContext(AuthContext);

  // console.log(authenticationInfos.customer.SellRequests);

  useEffect(() => {
    // console.log(authenticationInfos.customer.SellRequests);
  });

  let history = useHistory();

  return (
    <>
      <h1>
        <FormattedMessage
          id="app.allMySellRequests.title"
          defaultMessage={`My Sell Requests`}
        />
      </h1>
      <div className="container-table-responsive">
        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.reference"
                  defaultMessage={`Reference`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.status"
                  defaultMessage={`Status`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.submit"
                  defaultMessage={`Submit`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.sent"
                  defaultMessage={`Sent`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.reception"
                  defaultMessage={`Reception`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.lastModification"
                  defaultMessage={`Last Modification`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.customerValidation"
                  defaultMessage={`Cust. Validation`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.Validation"
                  defaultMessage={`Validation`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.numberOfCards"
                  defaultMessage={`Number of cards`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.allMySellRequests.table.totalAmount"
                  defaultMessage={`Total Amount`}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {authenticationInfos.customer.SellRequests &&
              authenticationInfos.customer.SellRequests.length > 0 &&
              authenticationInfos.customer.SellRequests.map(
                (sellRequest, index) => (
                  <Tr
                    key={sellRequest.id}
                    onClick={history.push(
                      "/my_sell_requests/" + sellRequest.id
                    )}
                  >
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
                        <DateDisplayer dateToHandle={sellRequest.DateSubmit} />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={"/my_sell_requests/" + sellRequest.id}
                        className="sellRequest-table-link"
                      >
                        <DateDisplayer dateToHandle={sellRequest.dateEnvoi} />
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
