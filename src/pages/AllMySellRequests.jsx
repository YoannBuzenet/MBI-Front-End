import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import sellRequestAPI from "../services/sellRequestAPI";

const AllMySellRequests = props => {
  // useEffect(() => {
  //   console.log(sellRequestAPI.findAll());
  // });

  const currentSellRequests = [
    {
      status: "En traitement",
      customerSendDate: "21/07/2020",
      shopReceptionDate: "23/07/2020",
      lastDateStatus: " 25/07/2020",
      internalRef: 2896,
      totalAmount: 896,
      cardQuantity: 296,
      cards: [
        {
          cardName: "Dague de vif-argent",
          set: "Invasion",
          price: 2,
          condition: "NM",
          lang: "EN",
          isFoil: "No",
          uuid: "9215-ddfsdf-9898-dsfdc",
          currency: "euros",
          quantity: 4
        },
        {
          cardName: "Sorcier Sybarite",
          set: "Planeshift",
          price: 2,
          condition: "NM",
          lang: "EN",
          isFoil: "No",
          uuid: "9215-ddfsdf-9898-dsfdv",
          currency: "euros",
          quantity: 4
        }
      ]
    },
    {
      status: "Envoyé",
      customerSendDate: "15/05/2020",
      shopReceptionDate: "21/05/2020",
      lastDateStatus: " 30/05/2020",
      internalRef: 2897,
      totalAmount: 32,
      cardQuantity: 6,
      cards: [
        {
          cardName: "Dague de vif-argent",
          set: "Invasion",
          price: 2,
          condition: "NM",
          lang: "EN",
          isFoil: "No",
          uuid: "9215-ddfsdf-9898-dsfdc",
          currency: "euros",
          quantity: 4
        },
        {
          cardName: "Sorcier Sybarite",
          set: "Planeshift",
          price: 2,
          condition: "NM",
          lang: "EN",
          isFoil: "No",
          uuid: "9215-ddfsdf-9898-dsfdv",
          currency: "euros",
          quantity: 4
        }
      ]
    }
  ];

  return (
    <>
      <h1>Mes demandes de rachat</h1>
      <table className="zebra-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Date Envoi</th>
            <th>Date Réception</th>
            <th>Status</th>
            <th>Date Dernier traitement</th>
            <th>Nombre de cartes</th>
            <th>Montant total</th>
          </tr>
        </thead>
        <tbody>
          {currentSellRequests.map((sellRequest, index) => (
            <tr key={index}>
              <td>
                <Link to={"/my_sell_requests/" + sellRequest.internalRef}>
                  {sellRequest.internalRef}
                </Link>
              </td>
              <td>{sellRequest.customerSendDate}</td>
              <td>{sellRequest.shopReceptionDate}</td>
              <td>{sellRequest.status}</td>
              <td>{sellRequest.lastDateStatus}</td>
              <td>{sellRequest.cards.length}</td>
              <td>{sellRequest.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllMySellRequests;
