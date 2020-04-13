import React, { useEffect, useState } from "react";
import CardWithThumbnail from "./CardWithThumbnail";
import axios from "axios";
import CardThumbnailLoader from "./loaders/CardThumbnailLoader";
import config from "../services/config";
import localStorageAPI from "../services/localStorageAPI";

const LastModifications = () => {
  const [lastModificationList, setLastModificationList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Check if last modification cookie is here and not EXP
    const localStorageLastModifications = JSON.parse(
      window.localStorage.getItem("last-modifications")
    );

    const now = new Date().getTime();

    if (
      localStorageLastModifications &&
      localStorageLastModifications.expirationDate > now
    ) {
      // console.log(localStorageLastModifications.expirationDate);
      // console.log(now);
      setLastModificationList(localStorageLastModifications.data);
      setIsLoading(false);
    } else {
      //If cookie is expired, we call API
      axios
        .get(
          config.URL_API + "/lastcardsmodified?limit=10&shopid=" + config.shopID
        )
        .then((data) => {
          setLastModificationList(data.data);
          return data;
        })
        .then((data) => {
          let lastModifications = {
            expirationDate:
              new Date().getTime() + config.TIME_TO_EXPIRE_LAST_MODIFICATION,
            data: data.data,
          };
          localStorageAPI.saveLocalStorage(
            "last-modifications",
            lastModifications
          );
          return data.data;
        })
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }

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
