import React, { useContext } from "react";
import cardsAPI from "../services/cardsAPI";
import { Link } from "react-router-dom";
import MKMAPI from "../services/MKMAPI";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import mailAPI from "../services/mailAPI";

const CardWithThumbnail = ({ card }) => {
  const picture = cardsAPI.getSmallPictureFromScryfallId(card);

  let history = useHistory();

  function handleClick() {
    history.push("/card/" + card.name);
  }

  return (
    <>
      <div className="card" onClick={handleClick}>
        <div className="card-picture">
          <img src={picture} alt="" />
        </div>
        <div className="card-infos">
          <div className="card-title">{card.name}</div>
          <div className="card-set">
            {card.edition ? card.edition.name : null}
          </div>
          <Link to={"/card/" + card.name}>
            <FormattedMessage
              id="app.cardThumbnail.seeCardDetails"
              defaultMessage={`See More`}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardWithThumbnail;
