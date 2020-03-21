import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import cardsAPI from "../services/cardsAPI";

const CardPage = ({ match, history }) => {
  //STATE - current card name
  const [currentName, setCurrentName] = useState(match.params.cardName);

  //STATE - current Card Name decoded
  const [currentNameDecoded, setCurrentNameDecoded] = useState(
    decodeURI(currentName)
  );

  //STATE - current cards displayed
  const [allCardsDisplayed, setAllCardsDisplayed] = useState([]);

  //CONTEXT langages and Conditions
  const { lang, conditions } = useContext(GenericCardInfosContext);

  useEffect(() => {
    setCurrentName(match.params.cardName);
  }, [match.params.cardName]);

  useEffect(() => {
    setCurrentNameDecoded(currentName);
  }, [currentName]);

  useEffect(() => {
    if (
      match.params.cardName !== currentName ||
      allCardsDisplayed.length === 0
    ) {
      //Cancel subscriptions preparation
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      cardsAPI
        .getByName(currentNameDecoded, {
          cancelToken: source.token
        })
        .then(data => {
          // console.log(data.data["hydra:member"]);
          return data;
        })
        .then(data => setAllCardsDisplayed(data.data["hydra:member"]));
      return () => source.cancel("");
    }
  });

  return (
    <>
      <h1>{currentName}</h1>
      {allCardsDisplayed.map(element => console.log(element))}
      CECI EST UNE PAGE MDRRRRR HAHAHHAHAHH
    </>
  );
};

export default CardPage;
