import React, { useEffect, useState } from "react";
import CardWithThumbnail from "./CardWithThumbnail";
import axios from "axios";
import CardThumbnailLoader from "./loaders/CardThumbnailLoader";
import config from "../services/config";

const LastModifications = () => {
  const [lastModificationList, setLastModificationList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        config.URL_API + "/lastcardsmodified?limit=10&shopid=" + config.shopID
      )
      .then((data) => setLastModificationList(data.data))
      .then(() => setIsLoading(false));
    //ADD CANCEL EFFECT
  }, []);

  return (
    <>
      <div className="last-modification">
        <h2>Les dernières modifications</h2>
        <div className="all-cards">
          {isLoading && (
            <>
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
              <CardThumbnailLoader />
            </>
          )}
          {!isLoading &&
            lastModificationList.map((card, index) => (
              <CardWithThumbnail card={card} key={card.id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default LastModifications;
