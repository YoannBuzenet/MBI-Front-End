import React, { useEffect, useContext } from "react";
import axios from "axios";
import sellRequestAPI from "../../services/sellRequestAPI";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import CardLineShop from "../../components/shop/CardLineShop";
import CardLineShopStuck from "../../components/shop/CardLineShopStuck";
import AdminSellRequestContext from "../../context/adminSellRequestContext";
import ShopSellRequestStatusValidator from "../../components/shop/ShopSellRequestStatusValidator";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { toast } from "react-toastify";

const ShopAdminOneSellRequest = ({ match }) => {
  const { id } = match.params;

  // const [currentSellRequest, setCurrentSellRequest] = useState({
  //   sellRequestCards: []
  // });

  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );
  // console.log(currentAdminSellRequest);

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
          cancelToken: source.token
        })
        .then(data => {
          console.log(data);
          return data;
        })
        .then(data => {
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
              ...data.sellRequestCards.map(card => {
                return {
                  id: card.id,
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
                  isFoil: card.isFoil
                };
              })
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    return () => source.cancel("");
  }, [id]);

  useEffect(() => {
    console.log("The global sell request did rerender");
    console.log(currentAdminSellRequest);
  }, []);

  //ENV VARIABLE TO DEFINE
  const gradingArea = "isEU";

  return (
    <>
      <h1>One Sell Request</h1>
      <div className="customer-infos">
        <p>
          Prénom :{" "}
          {currentAdminSellRequest.customer &&
            currentAdminSellRequest.customer.prenom}
        </p>
        <p>
          Nom :{" "}
          {currentAdminSellRequest.customer &&
            currentAdminSellRequest.customer.nom}
        </p>
        <p>
          Mail :{" "}
          {currentAdminSellRequest.customer &&
            currentAdminSellRequest.customer.user.email}
        </p>
        <p>
          Tel :{" "}
          {currentAdminSellRequest.customer &&
            currentAdminSellRequest.customer.tel}
        </p>
        <p>
          Adresse :{" "}
          {currentAdminSellRequest.customer &&
            currentAdminSellRequest.customer.adress}
        </p>
        <p>
          Code Postal :{" "}
          {currentAdminSellRequest.customer &&
            currentAdminSellRequest.customer.postalCode}
        </p>
        <p>
          Ville :{" "}
          {currentAdminSellRequest.customer &&
            currentAdminSellRequest.customer.town}
        </p>
      </div>
      <div className="sellRequest-infos">
        <p className="sellRequest-status">
          Statut
          <span className="subInfos">
            <StatusCalculator sellRequest={currentAdminSellRequest} />
          </span>
        </p>
        <p className="sellRequest-lastDate">
          Dernière information
          <span className="subInfos">
            <LastInformationCalculator sellRequest={currentAdminSellRequest} />
          </span>
        </p>
      </div>
      <div className="container">
        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>Nom de la carte</Th>
              <Th>Edition</Th>
              <Th>Changer Edition</Th>
              <Th>Langue</Th>
              <Th>Etat</Th>
              <Th>Foil</Th>
              <Th>Signée</Th>
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
                  currentAdminSellRequest.sellRequests.reduce((total, card) => {
                    return total + card.quantity;
                  }, 0)}
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
                  currentAdminSellRequest.sellRequests.reduce((total, card) => {
                    return total + card.price * card.quantity;
                  }, 0)}
              </td>
            </tr>
          </Tbody>
        </Table>
      </div>
      <ShopSellRequestStatusValidator />
    </>
  );
};

export default ShopAdminOneSellRequest;
