import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import cardsAPI from "../services/cardsAPI";
import CardLine from "../components/CardLine";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import TableLoader from "../components/loaders/TableLoader";
import { isMobile } from "react-device-detect";
import SetListLoader from "../components/loaders/SetListLoader";
import { FormattedMessage } from "react-intl";
import CardPageContext from "../context/cardsCardPageContext";
import CardShopPriceAPI from "../services/CardShopPriceAPI";
import config from "../services/config";

const CardPage = ({ match, handleAddSellingBasket }) => {
  //STATE - current card name
  const [currentName, setCurrentName] = useState(match.params.cardName);

  //STATE - current Card Name decoded
  const [currentNameDecoded, setCurrentNameDecoded] = useState(
    decodeURI(currentName)
  );

  const [hasUpdatedPrices, setHasUpdatedPrices] = useState(false);

  //CONTEXT - All cards displayed
  const { cardsCardPageContext, setCardsCardPageContext } = useContext(
    CardPageContext
  );
  console.log(cardsCardPageContext);
  //STATE - Is Loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentName(match.params.cardName);
  }, [match.params.cardName]);

  useEffect(() => {
    setCurrentNameDecoded(currentName);
  }, [currentName]);

  const ENGLISH_LANG_ID = 9;

  //This function takes API reponse with CardShopPrices and feeds the context.
  // If several languages are received from a single card, we prioritize baseLang price.
  const addFirstDisplayedPricesToContext = (data) => {
    const contextCopy = { ...cardsCardPageContext };
    for (let i = 0; i < data.length; i++) {
      if (contextCopy[data[i].card.substr(7)].LangOfPrice !== ENGLISH_LANG_ID) {
        contextCopy[data[i].card.substr(7)].price = data[i].price;
        contextCopy[data[i].card.substr(7)].LangOfPrice = parseInt(
          data[i].language.substr(11)
        );
      }
    }
    setCardsCardPageContext(contextCopy);
  };

  useEffect(() => {
    if (
      match.params.cardName !== currentName ||
      Object.keys(cardsCardPageContext).length === 0 ||
      Object.keys(cardsCardPageContext)[0].name !== currentName
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
        .then((data) => setCardsCardPageContext(data))
        .then(setHasUpdatedPrices(false))
        .then(() => setIsLoading(false));

      return () => source.cancel("");
    }
  }, [
    currentNameDecoded,
    currentName,
    cardsCardPageContext,
    match.params.cardName,
  ]);

  //Fetching prices once context is set up
  useEffect(() => {
    if (Object.keys(cardsCardPageContext).length > 0 && !hasUpdatedPrices) {
      CardShopPriceAPI.getArrayofPrices(
        Object.keys(cardsCardPageContext).map((id) => parseInt(id)),
        config.baseLang
      )
        .then((data) =>
          addFirstDisplayedPricesToContext(data.data["hydra:member"])
        )
        .then(setHasUpdatedPrices(true));
    }
  }, [cardsCardPageContext, setCardsCardPageContext]);

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
                <Th>
                  <FormattedMessage
                    id="app.cardPage.cardName"
                    defaultMessage={`Card Name`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.cardPage.set"
                    defaultMessage={`Set`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.cardPage.language"
                    defaultMessage={`Language`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.cardPage.condition"
                    defaultMessage={`Condition`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.cardPage.foil"
                    defaultMessage={`Foil`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.cardPage.signed"
                    defaultMessage={`Signed`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.cardPage.quantity"
                    defaultMessage={`Quantity`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.cardPage.price"
                    defaultMessage={`Price`}
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {cardsCardPageContext.map((card, index) => (
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
