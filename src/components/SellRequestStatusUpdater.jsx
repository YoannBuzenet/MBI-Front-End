import React, { useState, useEffect } from "react";
import sellRequestAPI from "../services/sellRequestAPI";

const SellRequestStatusUpdater = ({
  currentSellRequest,
  setCurrentSellRequest
}) => {
  const [hasBeenSent, setHasBeenSent] = useState(true);

  useEffect(() => {
    if (currentSellRequest.id) {
      if (currentSellRequest.dateEnvoi == null) {
        setHasBeenSent(false);
        console.log(currentSellRequest);
        if (!hasBeenSent) {
          console.log("ce rachat n'a pas été envoyé");
        }
      } else {
        setHasBeenSent(true);
      }
    }
  }, [currentSellRequest, hasBeenSent]);

  const handleClick = (event, currentSellRequest) => {
    //Mettre à jour l'API
    //Refresh le contexte OU LE STATUS JE SAIS PLUS LOL
    console.log("clické");
    sellRequestAPI
      .update(currentSellRequest.id, { dateEnvoi: new Date() })
      .then(data =>
        setCurrentSellRequest({
          ...currentSellRequest,
          dateEnvoi: data.data.dateEnvoi
        })
      );
    // setHasBeenSent(true);
  };

  return (
    <>
      {currentSellRequest && !hasBeenSent ? (
        <button
          onClick={event => {
            handleClick(event, currentSellRequest);
          }}
        >
          Marquer ce rachat comme envoyé
        </button>
      ) : null}
    </>
  );
};

export default SellRequestStatusUpdater;
