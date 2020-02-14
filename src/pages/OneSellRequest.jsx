import React, { useEffect, useState } from "react";
import sellRequestAPI from "../services/sellRequestAPI";
import axios from "axios";
import StatusCalculator from "../components/StatusCalculator";
import LastInformationCalculator from "../components/LastInformationCalculator";

const OneSellRequest = ({ match, history }) => {
  //ENV VARIABLE TO DEFINE
  const gradingArea = "isEU";

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

  console.log(currentSellRequest.sellRequestCards);

  return (
    <>
      <h1>Mon Rachat</h1>
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
          {currentSellRequest.sellRequestCards.length > 0 &&
            currentSellRequest.sellRequestCards.map((card, index) => (
              <tr key={index}>
                <td>{card.cards.name}</td>
                <td>{card.cards.edition.name}</td>
                <td>
                  {gradingArea == "isEu"
                    ? card.CardCondition.shortname
                    : card.CardCondition.shortnameUS}
                </td>
                <td>{card.language.shortname}</td>
                <td>{card.language.isFoil ? "Yes" : "No"}</td>
                <td>{card.price}</td>
                <td>{card.cardQuantity}</td>
                <td>{card.price * card.cardQuantity}</td>
              </tr>
            ))}
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

export default OneSellRequest;
