import React, { useEffect, useState } from "react";
import axios from "axios";
import sellRequestAPI from "../../services/sellRequestAPI";
import { Link } from "react-router-dom";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";

const ShopAdminAllSellRequests = props => {
  //Variable to clean up useEffect Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  //STATE on all sell requests
  const [allSellRequests, setAllSellRequests] = useState([]);

  useEffect(() => {
    sellRequestAPI
      .findAll({
        cancelToken: source.token
      })
      .then(response => setAllSellRequests(response.data["hydra:member"]));
    console.log("hey");

    return () => source.cancel("");
  }, []);

  return (
    <>
      <h1>Tous les rachats</h1>
      <table className="zebra-table">
        <thead>
          <tr>
            <th>Numéro de Rachat</th>
            <th>Status</th>
            <th>Date Dernier Traitement</th>
            <th>Nombre de cartes</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {allSellRequests.length > 0 &&
            allSellRequests.map(sellRequest => {
              console.log(sellRequest);

              return (
                <tr key={sellRequest.id}>
                  <td>
                    <Link to={"/shopadmin/customers/" + sellRequest.id}>
                      {sellRequest.id}
                    </Link>
                  </td>
                  <td>
                    <StatusCalculator sellRequest={sellRequest} />
                  </td>
                  <td>
                    <LastInformationCalculator sellRequest={sellRequest} />
                  </td>
                  <td>{sellRequest.cardTotalQuantity}</td>
                  <td>{sellRequest.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ShopAdminAllSellRequests;
