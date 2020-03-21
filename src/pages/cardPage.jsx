import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GenericCardInfosContext from "../context/genericCardInfosContext";
import cardsAPI from "../services/cardsAPI";
import CardLine from "../components/CardLine";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const CardPage = ({ match, handleAddSellingBasket }) => {
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
      allCardsDisplayed.length === 0 ||
      allCardsDisplayed[0].name !== currentName
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
  }, [currentNameDecoded, currentName]);

  return (
    <>
      <div className="container">
        <h1>{currentName}</h1>
        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>Nom de la carte</Th>
              <Th>Edition</Th>
              <Th>Langue</Th>
              <Th>Condition</Th>
              <Th>Foil</Th>
              <Th>Quantité</Th>
              <Th>Prix</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allCardsDisplayed.map((card, index) => (
              <CardLine
                card={card}
                index={index}
                setName={card.edition.name}
                key={parseInt(card["@id"].substr(7))}
                displaySets={true}
              />
            ))}
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export default CardPage;
