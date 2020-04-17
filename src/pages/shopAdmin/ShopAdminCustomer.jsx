import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import OneLineLoader from "../../components/loaders/OneLineLoader";
import FeatherIcon from "feather-icons-react";
import OneBigLineLoader from "../../components/loaders/OneBigLineLoader";
import errorHandlingAPI from "../../services/errorHandlingAPI";
import { FormattedMessage } from "react-intl";

const ShopAdminCustomer = ({ match }) => {
  const { id } = match.params;

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const [customerData, setCustomerData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    customersAPI
      .findOneById(id, {
        cancelToken: source.token,
      })
      .then((response) => setCustomerData(response.data))
      .then(() => setIsLoading(false))
      .catch((error) => errorHandlingAPI.check401Unauthorized(error));

    return () => source.cancel("");
  }, []);

  return (
    <>
      <div className="container">
        <div className="customer-identity">
          <h1 className="customer-full-name">
            <span className="customer_firstName">
              {isLoading && (
                <>
                  <OneBigLineLoader />
                  <span> </span>
                  <OneBigLineLoader />
                </>
              )}
              {!isLoading && customerData && customerData.prenom}
            </span>
            <span> </span>
            <span className="customer_lastName">
              {customerData && customerData.nom}
            </span>
          </h1>
          <div className="customer-infos">
            <div className="customer-left-part">
              <p>
                <FeatherIcon
                  icon="at-sign"
                  size="20"
                  className="downsize-icon"
                />
                <span> </span>
                {isLoading && <OneLineLoader />}
                {!isLoading && customerData && customerData.user.email}
              </p>
              <p>
                <FeatherIcon icon="phone" size="20" className="downsize-icon" />
                <span> </span>
                {isLoading && <OneLineLoader />}
                {!isLoading && customerData && customerData.tel}
              </p>
            </div>
            <div className="customer-right-part">
              <p>
                <FeatherIcon icon="home" size="20" className="downsize-icon" />
                <span> </span>
                {isLoading && <OneLineLoader />}
                {!isLoading && customerData && customerData.adress}
              </p>
              <p>
                <FormattedMessage
                  id="app.shop.customer.postalCode"
                  defaultMessage={`Postal Code : `}
                />{" "}
                {isLoading && <OneLineLoader />}
                {!isLoading && customerData && customerData.postalCode}
              </p>
              <p>
                <FormattedMessage
                  id="app.shop.customer.town"
                  defaultMessage={`Town : `}
                />
                {isLoading && <OneLineLoader />}
                {!isLoading && customerData && customerData.town}
              </p>
            </div>
          </div>
        </div>

        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>
                <FormattedMessage
                  id="app.shop.customer.SellRequestReference"
                  defaultMessage={`Sell Request Reference`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.shop.customer.status"
                  defaultMessage={`Status`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.shop.customer.lastInformation"
                  defaultMessage={`Last Information`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.shop.customer.numberOfCards"
                  defaultMessage={`Number of cards`}
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.shop.customer.amount"
                  defaultMessage={`Amount`}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {customerData &&
              customerData.sellrequest &&
              customerData.sellrequest.length > 0 &&
              customerData.sellrequest.map((sellRequest) => {
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
