import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import sellRequestAPI from "../../services/sellRequestAPI";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import CardLineShop from "../../components/shop/CardLineShop";
import CardLineShopStuck from "../../components/shop/CardLineShopStuck";
import AdminSellRequestContext from "../../context/adminSellRequestContext";
import ShopSellRequestStatusValidator from "../../components/shop/ShopSellRequestStatusValidator";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import OneLineLoader from "../../components/loaders/OneLineLoader";
import TableLoader from "../../components/loaders/TableLoader";
import OneBigLineLoader from "../../components/loaders/OneBigLineLoader";
import errorHandlingAPI from "../../services/errorHandlingAPI";

const ShopAdminOneSellRequest = ({ match }) => {
  const { id } = match.params;

  const [isLoading, setIsLoading] = useState(true);

  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );
  console.log(currentAdminSellRequest);

  useEffect(() => {
    if (
      currentAdminSellRequest.sellRequests &&
      currentAdminSellRequest.sellRequests.length > 0 &&
      currentAdminSellRequest.idSellRequest !== parseInt(id)
    ) {
      setCurrentAdminSellRequest([]);
    }
  }, [id]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (
      (currentAdminSellRequest.sellRequests &&
        currentAdminSellRequest.sellRequests.length == 0) ||
      currentAdminSellRequest.idSellRequest !== parseInt(id)
    ) {
      sellRequestAPI
        .findById(id, {
          cancelToken: source.token,
        })
        .then((data) => {
          // console.log(data);
          return data;
        })
        .then((data) => {
          return setCurrentAdminSellRequest({
            id: data.id,
            DateSubmit: data.DateSubmit,
            dateEnvoi: data.dateEnvoi,
            dateRecu: data.dateRecu,
            dateProcessing: data.dateProcessing,
            dateApprovalPending: data.dateApprovalPending,
            dateValidated: data.dateValidated,
            dateCanceled: data.dateCanceled,
            customer: data.client,
            amount: data.amount,
            cardTotalQuantity: data.cardTotalQuantity,
            shop: data.shop,
            idSellRequest: data.id,
            sellRequests: [
              ...data.sellRequestCards.map((card) => {
                return {
                  id: card.id,
                  mcmId: card.cards.mcmid,
                  name: card.cards.name,
                  scryfallid: card.cards.scryfallid,
                  hasfoil: 1,
                  hasnonfoil: 1,
                  uuid: card.cards.uuid,
                  foreignData: card.cards.foreignData,
                  condition: card.CardCondition.id.toString(),
                  lang: card.language.id,
                  set: card.cards.edition.name,
                  price: card.price,
                  quantity: card.cardQuantity,
                  isFoil: card.isFoil,
                  isSigned: card.isSigned,
                  isAltered: card.isAltered,
                };
              }),
            ],
          });
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          errorHandlingAPI.check401Unauthorized(err);
        });
    }

    return () => source.cancel("");
  }, [id]);

  return (
    <>
      <div className="container">
        <h1>One Sell Request</h1>
        <div className="customer-infos">
          <div className="customer-left-part">
            <p>
              Prénom : {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.prenom}
            </p>
            <p>
              Nom : {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.nom}
            </p>
            <p>
              Mail : {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.user.email}
            </p>
            <p>
              Tel : {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.tel}
            </p>
          </div>
          <div className="customer-right-part">
            <p>
              Adresse : {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.adress}
            </p>
            <p>
              Code Postal : {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.postalCode}
            </p>
            <p>
              Ville : {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.town}
            </p>
          </div>
        </div>
        <div className="sellRequest-infos">
          <p className="sellRequest-status">
            Statut
            {isLoading && (
              <span className="margin-top-negative-loader display-block">
                <OneBigLineLoader />
              </span>
            )}
            {!isLoading && (
              <span className="subInfos">
                <StatusCalculator sellRequest={currentAdminSellRequest} />
              </span>
            )}
          </p>
          <p className="sellRequest-lastDate">
            Dernière information
            {isLoading && (
              <span className="margin-top-negative-loader display-block">
                <OneBigLineLoader />
              </span>
            )}
            {!isLoading && (
              <span className="subInfos">
                <LastInformationCalculator
                  sellRequest={currentAdminSellRequest}
                />
              </span>
            )}
          </p>
        </div>
        {isLoading && <TableLoader />}
        {!isLoading && (
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <Th>Nom</Th>
                <Th>Edition</Th>
                <Th>Modifier</Th>
                <Th>Langue</Th>
                <Th>Etat</Th>
                <Th>Foil</Th>
                <Th>Signée</Th>
                <Th>Altérée</Th>
                <Th>Quantité</Th>
                <Th>Prix</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody className="cardLineShop">
              {!currentAdminSellRequest.dateValidated &&
                currentAdminSellRequest.sellRequests &&
                currentAdminSellRequest.sellRequests.length > 0 &&
                currentAdminSellRequest.sellRequests.map((card, index) => {
                  return (
                    <CardLineShop key={card.id} card={card} indexCard={index} />
                  );
                })}
              {currentAdminSellRequest.dateValidated ||
                (currentAdminSellRequest.dateCanceled &&
                  currentAdminSellRequest.sellRequests.map((card, index) => {
                    return (
                      <CardLineShopStuck
                        key={card.id}
                        card={card}
                        indexCard={index}
                      />
                    );
                  }))}
              <tr className="total-line">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>NOMBRE DE CARTES</td>
                <td>
                  {currentAdminSellRequest.sellRequests &&
                    currentAdminSellRequest.sellRequests.length > 0 &&
                    currentAdminSellRequest.sellRequests.reduce(
                      (total, card) => {
                        return total + card.quantity;
                      },
                      0
                    )}
                </td>
              </tr>
              <tr className="total-line">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>TOTAL</td>
                <td>
                  {currentAdminSellRequest.sellRequests &&
                    currentAdminSellRequest.sellRequests.length > 0 &&
                    currentAdminSellRequest.sellRequests.reduce(
                      (total, card) => {
                        return total + card.price * card.quantity;
                      },
                      0
                    )}
                </td>
              </tr>
            </Tbody>
          </Table>
        )}

        <ShopSellRequestStatusValidator />
      </div>
    </>
  );
};

export default ShopAdminOneSellRequest;
