import React, { useState, useContext } from "react";
import { Tr, Td } from "react-super-responsive-table";
import genericCardAPI from "../services/genericCardAPI";
import { isMobile } from "react-device-detect";
import cardsAPI from "../services/cardsAPI";
import AuthContext from "../context/authContext";

const CardLineSearchResult = ({ card, history }) => {
  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  const hoverClassName = (e) => genericCardAPI.isPictureDisplayedTopOrBottom(e);

  //Current Authentication
  const { authenticationInfos } = useContext(AuthContext);

  let URLcard;
  if (authenticationInfos.user.roles.includes("ROLE_SHOP")) {
    URLcard = "/shopadmin/card/" + card.name;
  } else {
    URLcard = "/card/" + card.name;
  }
  return (
    <Tr
      onMouseEnter={(e) => {
        if (!isMobile) {
          setIsOnHover(true);
          setHoverTopOrBottom(hoverClassName(e));
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsOnHover(false);
        }
      }}
      key={card.name}
      onClick={(e) => history.push(URLcard)}
    >
      <Td className="cardPictureHolder line-result-search-page">
        <div className="pictureCard">
          <img src={cardsAPI.getSmallPictureFromScryfallId(card)} />
        </div>
        <div className="cardText">
          <p>{card.name}</p>
        </div>
        {/* {!isMobile && isOnHover && (
          <div className={hoverTopOrBottom}>
            <img
              src={cardsAPI.getSmallPictureFromScryfallId(card)}
              alt={card.name}
            />
          </div>
        )} */}
      </Td>
    </Tr>
  );
};

export default CardLineSearchResult;
