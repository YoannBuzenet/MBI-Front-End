import React from "react";

const OneSellRequest = props => {
  return (
    <>
      <h1>Mon Rachat</h1>
      <div className="sellRequest-infos">
        <p className="sellRequest-status">
          Statut<span className="subInfos">En cours de traitement</span>
        </p>
        <p className="sellRequest-lastDate">
          Dernière information<span className="subInfos">21/07/2019</span>
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
          <tr>
            <td>Kavru Languefeu</td>
            <td>Planeshift</td>
            <td>Near Mint</td>
            <td>FR</td>
            <td>Non</td>
            <td>.25€</td>
            <td>2</td>
            <td>.5</td>
          </tr>
          <tr>
            <td>Kavru Languefeu</td>
            <td>Planeshift</td>
            <td>Near Mint</td>
            <td>FR</td>
            <td>Non</td>
            <td>.25€</td>
            <td>2</td>
            <td>.5</td>
          </tr>
          <tr>
            <td>Kavru Languefeu</td>
            <td>Planeshift</td>
            <td>Near Mint</td>
            <td>FR</td>
            <td>Non</td>
            <td>.25€</td>
            <td>2</td>
            <td>.5</td>
          </tr>
          <tr>
            <td>Kavru Languefeu</td>
            <td>Planeshift</td>
            <td>Near Mint</td>
            <td>FR</td>
            <td>Non</td>
            <td>.25€</td>
            <td>2</td>
            <td>.5</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OneSellRequest;