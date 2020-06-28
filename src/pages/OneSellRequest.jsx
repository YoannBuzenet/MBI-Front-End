import React, { useEffect, useState } from "react";
import sellRequestAPI from "../services/sellRequestAPI";
import axios from "axios";
import StatusCalculator from "../components/StatusCalculator";
import LastInformationCalculator from "../components/LastInformationCalculator";
import SellRequestStatusUpdater from "../components/SellRequestStatusUpdater";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import config from "../services/config";
import { FormattedMessage } from "react-intl";
import priceUpdateAPI from "../services/priceUpdateAPI";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import { isMobile } from "react-device-detect";
import SetListLoader from "../components/loaders/SetListLoader";

const OneSellRequest = ({ match, history }) => {
  const { id } = match.params;

  const [currentSellRequest, setCurrentSellRequest] = useState({
    sellRequestCards: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  console.log("current sell request", currentSellRequest);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (
      currentSellRequest.sellRequestCards.length === 0 ||
      (currentSellRequest.sellRequestCards.length > 0 &&
        currentSellRequest.id !== id)
    ) {
      sellRequestAPI
        .findById(id, {
          cancelToken: source.token,
        })
        .then((data) => {
          setCurrentSellRequest(data);
        })
        .then(() => setIsLoading(false))
        .catch((error) => {
          // console.log(error);
          setIsLoading(false);
          if (error.message) {
            toast.error(
              <FormattedMessage
                id="app.OneSellRequest.getRequest.toast.failure"
                defaultMessage={`The Sell Request couldn't be loaded. Please try again later.`}
              />,
              {
                toastId: 1,
              }
            );
          }
        });
    }

    return () => source.cancel("");
  }, [id]);

  // console.log(currentSellRequest.sellRequestCards);

  return (
    <div className="container">
      <h1>
        <FormattedMessage
          id="app.OneSellRequest.title"
          defaultMessage={`My Sell Request`}
        />
        <span> n°{id}</span>
      </h1>
      {isLoading && !isMobile && <TableLoader />}
      {isLoading && isMobile && (
        <>
          <SetListLoader />
          <SetListLoader />
        </>
      )}
      {!isLoading && (
        <>
          <div className="sellRequest-infos container">
            <p className="sellRequest-status">
              <FormattedMessage
                id="app.OneSellRequest.status"
                defaultMessage={`Status`}
              />
              <span className="subInfos">
                <StatusCalculator sellRequest={currentSellRequest} />
              </span>
            </p>
            <p className="sellRequest-lastDate">
              <FormattedMessage
                id="app.OneSellRequest.lastInformation"
                defaultMessage={`Last Information`}
              />
              <span className="subInfos">
                <LastInformationCalculator sellRequest={currentSellRequest} />
              </span>
            </p>
          </div>
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.cardName"
                    defaultMessage={`Card`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.set"
                    defaultMessage={`Set`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.condition"
                    defaultMessage={`Condition`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.language"
                    defaultMessage={`Language`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.foil"
                    defaultMessage={`Foil`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.signed"
                    defaultMessage={`Signed`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.price"
                    defaultMessage={`Price`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.quantity"
                    defaultMessage={`Quantity`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.OneSellRequest.totalAmount"
                    defaultMessage={`Total : `}
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentSellRequest.sellRequestCards.length > 0 &&
                currentSellRequest.sellRequestCards.map((card, index) => (
                  <Tr key={index}>
                    <Td>{card.cards.name}</Td>
                    <Td>{card.cards.edition.name}</Td>
                    <Td>
                      {config.gradingArea === "EU"
                        ? card.CardCondition.shortname
                        : card.CardCondition.shortnameUS}
                    </Td>
                    <Td>{card.language.shortname}</Td>
                    <Td>{card.language.isFoil ? "Yes" : "No"}</Td>
                    <Td>{card.language.isSigned ? "Yes" : "No"}</Td>
                    <Td>{card.price}</Td>
                    <Td>{card.cardQuantity}</Td>
                    <Td>{card.price * card.cardQuantity}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          <span className="under-table-total">
            <FormattedMessage
              id="app.OneSellRequest.totalCardSellRequest"
              defaultMessage={`Total : `}
            />
            {currentSellRequest.sellRequestCards.length > 0 &&
              currentSellRequest.sellRequestCards.reduce((total, card) => {
                return total + card.cardQuantity;
              }, 0)}
          </span>

          <span className="under-table-total">
            <FormattedMessage
              id="app.OneSellRequest.totalAmountSellRequest"
              defaultMessage={`Total : `}
            />
            {currentSellRequest.sellRequestCards.length > 0 &&
              priceUpdateAPI.smoothFloatKeepEntireComplete(
                currentSellRequest.sellRequestCards.reduce((total, card) => {
                  return total + card.price * card.cardQuantity;
                }, 0)
              )}
          </span>
          <SellRequestStatusUpdater
            currentSellRequest={currentSellRequest}
            setCurrentSellRequest={setCurrentSellRequest}
            id={id}
          />
        </>
      )}
    </div>
  );
};

export default OneSellRequest;
