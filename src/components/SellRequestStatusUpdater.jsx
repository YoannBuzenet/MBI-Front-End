import React, { useState, useEffect } from "react";
import sellRequestAPI from "../services/sellRequestAPI";

const SellRequestStatusUpdater = ({
  currentSellRequest,
  setCurrentSellRequest
}) => {
  const [hasBeenSent, setHasBeenSent] = useState(true);

  useEffect(() => {
    if (currentSellRequest.id) {
      if (
        currentSellRequest.dateEnvoi == null &&
        currentSellRequest.dateRecu == null
      ) {
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
    sellRequestAPI
      .update(currentSellRequest.id, { dateEnvoi: new Date() })
      .then(data =>
        setCurrentSellRequest({
          ...currentSellRequest,
          dateEnvoi: data.data.dateEnvoi
        })
      );
    //TODO ADD A TOAST FOR SUCCESS
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
    // TODO : ADD A TRACKING NUMBER
  );
};

export default SellRequestStatusUpdater;
