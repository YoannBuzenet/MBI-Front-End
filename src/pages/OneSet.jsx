import React, { useContext, useEffect, useState } from "react";
import SetList from "../components/SetList";
import CardLineOneSet from "../components/CardLineOneSet";
import SetsAPI from "../services/setsAPI";
import SetsContext from "../context/setsContext";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import CardShopPriceAPI from "../services/CardShopPriceAPI";
import cardsOneSetContext from "../context/cardsOneSetContext";
import axios from "axios";
import OneSetLoader from "../components/loaders/OneSetLoader";
import { isMobile } from "react-device-detect";
import SetListLoader from "../components/loaders/SetListLoader";
import config from "../services/config";
import SetLangChoice from "../components/SetLangChoice";

const OneSet = ({ handleAddSellingBasket, match }) => {
  //Current Cards displayed in One Set Page
  const { cardsContext, setCardsContext } = useContext(cardsOneSetContext);

  console.log(cardsContext);

  const ENGLISH_LANG_ID = 9;

  //State of the set, initialized as empty array, about to receive the complete card list
  const [cards, setCards] = useState([]);

  //ID of the current set
  const [idSet, setIdSet] = useState(match.params.id);

  //We are getting the context of all sets, to fetch the set name in the good language
  const { allSets, setAllSets } = useContext(SetsContext);

  //Creating a state to be able to write the set name
  const [setName, setSetName] = useState("");

  const [hasUpdatedPrices, setHasUpdatedPrices] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [langIDToDisplay, setLangIDToDisplay] = useState(config.baseLang);

  const [isDisplayedLangChoice, setIsDisplayedLangChoice] = useState(false);

  const [languagesAvailables, setLanguagesAvailaibles] = useState({});

  const transformLanguagesArrayIntoObject = (array) => {
    let langObject = {};

    for (let i = 0; i < array.length; i++) {
      langObject[array[i].language_id.id] = array[i].name;
    }

    return langObject;
  };

  //Buildling context with the API response with all cards from the set.
  //We add also DEFAULT caracs to cards here.
  const buildContextFromAPIResponse = (data) => {
    const contextCopy = { ...cardsContext };

    const currentSet = allSets.find((element) => element.id == idSet);

    for (let i = 0; i < data.length; i++) {
      contextCopy[data[i]["@id"].substr(7)] = {
        cardID: parseInt(data[i]["@id"].substr(7)),
        id: parseInt(data[i]["@id"].substr(7)),
        ["@id"]: "/cards/" + parseInt(data[i]["@id"].substr(7)),
        hasfoil: data[i].hasfoil,
        hasnonfoil: data[i].hasnonfoil,
        name: data[i].name,
        cardName: data[i].name,
        scryfallid: data[i].scryfallid,
        uuid: data[i].uuid,
        foreignData: data[i].foreignData,
        price: null,
        isFoil: data[i].hasnonfoil ? "No" : "Yes",
        isSigned: "No",
        set: currentSet ? currentSet.name : null,
        quantity: 1,
        condition: 2,
        lang: 9,
        foreignDataObject: transformLanguagesArrayIntoObject(
          data[i].foreignData
        ),
      };
    }
    setCardsContext(contextCopy);

    //Choosing lang to display
    //The list of available foreign data :
    const arrayList_of_set_foreign_languages = [...data[0].foreignData];
    const objectSorted_List_of_set_foreign_languages = transformLanguagesArrayIntoObject(
      arrayList_of_set_foreign_languages
    );

    setLanguagesAvailaibles(objectSorted_List_of_set_foreign_languages);
    //Check is there's a preference in localStorage -> check if it exists here, else EN
    //if not, check if baselang exist, else, EN
    //EN

    //Empty setState just to force re-render of component (sure hacky, must be refactored)
    setCards([]);
  };

  //This function takes API reponse with CardShopPrices and feeds the context.
  // If several languages are received from a single card, we prioritize baseLang price.
  const addFirstDisplayedPricesToContext = (data) => {
    const contextCopy = { ...cardsContext };
    for (let i = 0; i < data.length; i++) {
      if (contextCopy[data[i].card.substr(7)].LangOfPrice !== ENGLISH_LANG_ID) {
        contextCopy[data[i].card.substr(7)].price = data[i].price;
        contextCopy[data[i].card.substr(7)].LangOfPrice = parseInt(
          data[i].language.substr(11)
        );
      }
    }
    setCardsContext(contextCopy);
  };

  useEffect(() => {
    setIdSet(match.params.id);
  }, [match.params.id]);

  //Fetching data when component is mounted

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    //We get the current set Name if all the sets are loaded
    if (allSets.length > 0) {
      setIsLoading(true);

      const currentSet = allSets.find((element) => element.id == idSet);
      console.log(currentSet);
      setSetName(currentSet.name);
    }

    SetsAPI.findOneById(idSet, {
      cancelToken: source.token,
    })
      .then((data) => buildContextFromAPIResponse(data))
      .then(setHasUpdatedPrices(false))
      .then(() => setIsLoading(false));

    //Getting user back to the top page when clicking on a set link
    window.scrollTo(0, 0);

    return () => {
      setCardsContext({});
      return source.cancel("");
    };
  }, [idSet, setIdSet, allSets, match.params.id]);

  useEffect(() => {
    setHasUpdatedPrices(false);

    return setHasUpdatedPrices(false);
  }, []);

  //Fetching prices once context is set up
  useEffect(() => {
    if (Object.keys(cardsContext).length > 0 && !hasUpdatedPrices) {
      CardShopPriceAPI.getArrayofPrices(
        Object.keys(cardsContext).map((id) => parseInt(id)),
        3
      )
        .then((data) =>
          addFirstDisplayedPricesToContext(data.data["hydra:member"])
        )
        .then(setHasUpdatedPrices(true));
    }
  }, [cardsContext, buildContextFromAPIResponse]);

  return (
    <>
      <div className="container">
        <div className="content-split">
          <SetList />
          <div className="last-modification">
            <div className="set-top-line">
              <h1>{setName}</h1>
              <div
                onClick={() => setIsDisplayedLangChoice(!isDisplayedLangChoice)}
              >
                {Object.keys(cardsContext).length > 0 && (
                  <>
                    <img src="/flags/25X13/EN.png"></img>
                    <span className="arrow-menu"></span>
                  </>
                )}
                {isDisplayedLangChoice && (
                  <SetLangChoice langsAvailable={languagesAvailables} />
                )}
              </div>
            </div>
            {isLoading && !isMobile && <OneSetLoader />}
            {isLoading && isMobile && (
              <>
                <SetListLoader /> <SetListLoader />
              </>
            )}
            {!isLoading && (
              <Table className="zebra-table">
                <Thead>
                  <Tr>
                    <Th>Nom</Th>
                    <Th>Langue</Th>
                    <Th>Condition</Th>
                    <Th>Foil</Th>
                    <Th>Signée</Th>
                    <Th>Quantité</Th>
                    <Th>Prix</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(cardsContext).map((cardID, index) => {
                    return (
                      <CardLineOneSet
                        card={cardsContext[cardID]}
                        cardID={cardID}
                        index={index}
                        key={cardID}
                        handleAddSellingBasket={handleAddSellingBasket}
                        langIDToDisplay={langIDToDisplay}
                      />
                    );
                  })}
                </Tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSet;
