import React, { useState } from "react";
import { Tr, Td } from "react-super-responsive-table";
import genericCardAPI from "../services/genericCardAPI";
import { isMobile } from "react-device-detect";
import cardsAPI from "../services/cardsAPI";

const CardLineSearchResult = ({ card }) => {
  //Saving the Hover state
  const [isOnHover, setIsOnHover] = useState(false);

  //State - defining if the Hover should be Top or Bottom
  const [hoverTopOrBottom, setHoverTopOrBottom] = useState();

  const hoverClassName = (e) => genericCardAPI.isPictureDisplayedTopOrBottom(e);

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
    >
      <Td className="cardPictureHolder">
        {card.name}{" "}
        {!isMobile && isOnHover && (
          <div className={hoverTopOrBottom}>
            <img
              src={cardsAPI.getSmallPictureFromScryfallId(card)}
              alt={card.name}
            />
          </div>
        )}
      </Td>
    </Tr>
  );
};

export default CardLineSearchResult;
