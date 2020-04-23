import React, { useEffect, useState } from "react";
import axios from "axios";
import sellRequestAPI from "../../services/sellRequestAPI";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import TableLoader from "../../components/loaders/TableLoader";
import errorHandlingAPI from "../../services/errorHandlingAPI";
import { isMobile } from "react-device-detect";
import SetListLoader from "../../components/loaders/SetListLoader";
import { FormattedMessage } from "react-intl";
import priceUpdateAPI from "../../services/priceUpdateAPI";

const ShopAdminAllSellRequests = (props) => {
  //Variable to clean up useEffect Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  //STATE on all sell requests
  const [allSellRequests, setAllSellRequests] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sellRequestAPI
      .findAll({
        cancelToken: source.token,
      })
      .then((response) => setAllSellRequests(response.data["hydra:member"]))
      .then(() => setIsLoading(false))
      .catch((error) => errorHandlingAPI.check401Unauthorized(error));

    return () => source.cancel("");
  }, []);

  return (
    <>
      <div className="container">
        <h1>
          <FormattedMessage
            id="app.shop.AllSellRequests.title"
            defaultMessage={`All sell requests`}
          />
        </h1>
        {isLoading && !isMobile && <TableLoader />}
        {isLoading && isMobile && (
          <>
            <SetListLoader />
            <SetListLoader />
          </>
        )}
        {!isLoading && (
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllSellRequests.reference"
                    defaultMessage={`Reference`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllSellRequests.status"
                    defaultMessage={`Status`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllSellRequests.lastInformation"
                    defaultMessage={`Last Information`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllSellRequests.numberOfCards"
                    defaultMessage={`Number of cards`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllSellRequests.totalAmount"
                    defaultMessage={`Total : `}
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {allSellRequests.length > 0 &&
                allSellRequests.map((sellRequest) => {
                  // console.log(sellRequest);

                  return (
                    <Tr
                      key={sellRequest.id}
                      onClick={() =>
                        (window.location.href =
                          "/shopadmin/sell_requests/" + sellRequest.id)
                      }
                      className="cursor-pointer"
                    >
                      <Td>{sellRequest.id}</Td>
                      <Td>
                        <StatusCalculator sellRequest={sellRequest} />
                      </Td>
                      <Td>
                        <LastInformationCalculator sellRequest={sellRequest} />
                      </Td>
                      <Td>{sellRequest.cardTotalQuantity}</Td>
                      <Td>
                        {priceUpdateAPI.smoothFloatKeepEntireComplete(
                          sellRequest.amount
                        )}
                      </Td>
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

export default ShopAdminAllSellRequests;
