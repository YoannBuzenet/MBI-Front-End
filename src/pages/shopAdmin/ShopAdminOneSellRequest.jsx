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
          {currentSellRequest.sellRequestCards.length > 0 &&
            currentSellRequest.sellRequestCards.map((card, index) => (
              <tr key={index}>
                <CardLineShop card={card} />
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ShopAdminOneSellRequest;
