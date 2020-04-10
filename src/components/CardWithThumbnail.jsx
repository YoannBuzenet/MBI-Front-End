import React from "react";
import cardsAPI from "../services/cardsAPI";
import { Link } from "react-router-dom";
import MKMAPI from "../services/MKMAPI";
import axios from "axios";

const CardWithThumbnail = ({ card }) => {
  const picture = cardsAPI.getSmallPictureFromScryfallId(card);

  return (
    <>
      <div
        className="card"
        // onClick={() => (window.location.href = "/card/" + card.name)}
        onClick={() =>
          axios
            .get("https://api.cardmarket.com/ws/v2.0/account", {
              headers: {
                Authorization: MKMAPI.buildOAuthHeader(
                  "GET",
                  "https://api.cardmarket.com/ws/v2.0/account"
                ),
              },
            })
            .then((data) => console.log(data))
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
              }
              return console.log(error);
            })
        }
      >
        <div className="card-picture">
          <img src={picture} alt="" />
        </div>
        <div className="card-infos">
          <div className="card-title">{card.name}</div>
          <div className="card-set">
            {card.edition ? card.edition.name : null}
          </div>
          <Link to={"/card/" + card.name}>Voir la carte</Link>
        </div>
      </div>
    </>
  );
};

export default CardWithThumbnail;
