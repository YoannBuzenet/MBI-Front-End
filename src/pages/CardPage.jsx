import React, { useState, useEffect } from "react";
import axios from "axios";
import cardsAPI from "../services/cardsAPI";
import CardLine from "../components/CardLine";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import TableLoader from "../components/loaders/TableLoader";
import { isMobile } from "react-device-detect";
import SetListLoader from "../components/loaders/SetListLoader";

const CardPage = ({ match, handleAddSellingBasket }) => {
  const NUMBER_OF_LANGUAGES = 11;
  const NUMBER_OF_CONDITIONS = 7;

  //STATE - current card name
  const [currentName, setCurrentName] = useState(match.params.cardName);

  //STATE - current Card Name decoded
  const [currentNameDecoded, setCurrentNameDecoded] = useState(
    decodeURI(currentName)
  );

  //STATE - current cards displayed
  const [allCardsDisplayed, setAllCardsDisplayed] = useState([]);

  //STATE - Is Loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentName(match.params.cardName);
  }, [match.params.cardName]);

  useEffect(() => {
    setCurrentNameDecoded(currentName);
  }, [currentName]);

  /*
   * We receive all prices as an array. To make them browsable easily, we transform it in a big object.
   * We browse the array, build a big object, then fill it with data.
   */
  const makeCardShopPriceBrowsable = (array) => {
    // console.log("function called");
    for (let i = 0; i < array.length; i++) {
      //Creating the allPrices object that will hold all the data.
      array[i].allPrices = {};

      for (let h = 1; h <= NUMBER_OF_LANGUAGES; h++) {
        array[i].allPrices[h] = {};

        for (let g = 1; g <= NUMBER_OF_CONDITIONS; g++) {
          array[i].allPrices[h][g] = {};

          //Foil or Non Foil
          for (let f = 0; f < 2; f++) {
            array[i].allPrices[h][g][f] = {};

            //Signed or non signed
            for (let p = 0; p < 2; p++) {
              array[i].allPrices[h][g][f][p] = 0;
            }
          }
        }
      }

      //Now we fill it with data from CardShopPrice array.

      for (let j = 0; j < array[i].cardShopPrices.length; j++) {
        let currentLanguage = array[i].cardShopPrices[j].language.id;
        let currentCondition = parseInt(
          array[i].cardShopPrices[j].cardCondition.substr(17)
        );

        let isFoil = array[i].cardShopPrices[j].isFoil ? 1 : 0;
        let isSigned = array[i].cardShopPrices[j].isSigned ? 1 : 0;

        //language / condition / isfoil
        array[i].allPrices[currentLanguage][currentCondition][isFoil][
          isSigned
        ] = array[i].cardShopPrices[j].price;
      }
    }
    return array;
  };

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
          cancelToken: source.token,
        })
        .then((data) => {
          // console.log(data.data["hydra:member"]);
          return data.data["hydra:member"];
        })
        .then((data) => makeCardShopPriceBrowsable(data))
        .then((data) => setAllCardsDisplayed(data))
        .then(() => setIsLoading(false));

      return () => source.cancel("");
    }
  }, [
    currentNameDecoded,
    currentName,
    allCardsDisplayed,
    match.params.cardName,
  ]);

  return (
    <>
      <div className="container">
        <h1>{currentName}</h1>
        {isLoading && !isMobile && <TableLoader />}

        {isLoading && isMobile && (
          <>
            <SetListLoader />
            <SetListLoader />
          </>
        )}
        {!isLoading && (
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <Th>Nom de la carte</Th>
                <Th>Edition</Th>
                <Th>Langue</Th>
                <Th>Condition</Th>
                <Th>Foil</Th>
                <Th>Signée</Th>
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
                  handleAddSellingBasket={handleAddSellingBasket}
                />
              ))}
            </Tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default CardPage;
