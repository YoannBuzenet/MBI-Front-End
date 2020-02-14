import React, { useEffect, useState } from "react";
import axios from "axios";
import sellRequestAPI from "../../services/sellRequestAPI";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import CardLineShop from "../../components/shop/CardLineShop";

const ShopAdminOneSellRequest = ({ match }) => {
  const { id } = match.params;

  const [currentSellRequest, setCurrentSellRequest] = useState({
    sellRequestCards: []
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    sellRequestAPI
      .findById(id, {
        cancelToken: source.token
      })
      .then(data => {
        setCurrentSellRequest(data);
      });

    return () => source.cancel("");
  }, [id]);

  //ENV VARIABLE TO DEFINE
  const gradingArea = "isEU";

  return (
    <>
      <h1>One Sell Request</h1>
      <div className="sellRequest-infos">
        <p className="sellRequest-status">
          Statut
          <span className="subInfos">
            <StatusCalculator sellRequest={currentSellRequest} />
          </span>
        </p>
        <p className="sellRequest-lastDate">
          Dernière information
          <span className="subInfos">
            <LastInformationCalculator sellRequest={currentSellRequest} />
          </span>
        </p>
      </div>
      <table className="zebra-table">
        <thead>
          <tr>
            <th>Nom de la carte</th>
            <th>Edition</th>
            <th>Etat</th>
            <th>Langue</th>
            <th>Foil</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* CHECKER SI LE RACHAT EST VALIDÉ, SI OUI AUTRE COMPONENT QUE CARDLINESHOP - JUSTE MONTRER LES PROPS */}
          {currentSellRequest.sellRequestCards.length > 0 &&
            currentSellRequest.sellRequestCards.map((card, index) => {
              return (
                <tr key={parseInt(card["@id"].substr(7))}>
                  <CardLineShop
                    card={card}
                    indexCard={index}
                    currentSellRequest={currentSellRequest}
                    setCurrentSellRequest={setCurrentSellRequest}
                  />
                </tr>
              );
            })}
          <tr className="total-line">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>NOMBRE DE CARTES</td>
            <td>
              {currentSellRequest.sellRequestCards.length > 0 &&
                currentSellRequest.sellRequestCards.reduce((total, card) => {
                  return total + card.cardQuantity;
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
            <td>TOTAL</td>
            <td>
              {currentSellRequest.sellRequestCards.length > 0 &&
                currentSellRequest.sellRequestCards.reduce((total, card) => {
                  return total + card.price * card.cardQuantity;
                }, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShopAdminOneSellRequest;
