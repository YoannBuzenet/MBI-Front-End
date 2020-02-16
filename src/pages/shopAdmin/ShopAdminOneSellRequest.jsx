import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import sellRequestAPI from "../../services/sellRequestAPI";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import CardLineShop from "../../components/shop/CardLineShop";
import AdminSellRequestContext from "../../context/adminSellRequestContext";

const ShopAdminOneSellRequest = ({ match }) => {
  const { id } = match.params;

  // const [currentSellRequest, setCurrentSellRequest] = useState({
  //   sellRequestCards: []
  // });

  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );

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
        });
    }

    return () => source.cancel("");
  }, [id]);

  useEffect(() => {
    console.log("The global sell request did rerender");
    //console.log(currentAdminSellRequest);
  }, []);

  //ENV VARIABLE TO DEFINE
  const gradingArea = "isEU";

  return (
    <>
      <h1>One Sell Request</h1>
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
      <table className="zebra-table">
        <thead>
          <tr>
            <th>Nom de la carte</th>
            <th>Edition</th>
            <th>Changer Edition</th>
            <th>Langue</th>
            <th>Etat</th>
            <th>Foil</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="cardLineShop">
          {/* CHECKER SI LE RACHAT EST VALIDÉ, SI OUI AUTRE COMPONENT QUE CARDLINESHOP - JUSTE MONTRER LES PROPS */}
          {currentAdminSellRequest.sellRequests &&
            currentAdminSellRequest.sellRequests.length > 0 &&
            currentAdminSellRequest.sellRequests.map((card, index) => {
              return (
                <CardLineShop key={card.id} card={card} indexCard={index} />
              );
            })}
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
              {currentAdminSellRequest.sellRequestCards &&
                currentAdminSellRequest.sellRequestCards.length > 0 &&
                currentAdminSellRequest.sellRequestCards.reduce(
                  (total, card) => {
                    return total + card.cardQuantity;
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
              {currentAdminSellRequest.sellRequestCards &&
                currentAdminSellRequest.sellRequestCards.length > 0 &&
                currentAdminSellRequest.sellRequestCards.reduce(
                  (total, card) => {
                    return total + card.price * card.cardQuantity;
                  },
                  0
                )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShopAdminOneSellRequest;
