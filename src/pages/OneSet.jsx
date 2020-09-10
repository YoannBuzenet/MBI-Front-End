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
import languagesDefinition from "../definitions/languagesDefinition";
import userPreferencesContext from "../context/userPreferenceContext";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

const OneSet = ({ handleAddSellingBasket, match }) => {
  //Current Cards displayed in One Set Page
  const { cardsContext, setCardsContext } = useContext(cardsOneSetContext);

  const { userPreferences } = useContext(userPreferencesContext);

  // console.log(cardsContext);

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

  const [langIDToDisplay, setLangIDToDisplay] = useState(
    parseInt(process.env.REACT_APP_SHOP_BASELANG)
  );

  const [isDisplayedLangChoice, setIsDisplayedLangChoice] = useState(false);

  const [languagesAvailables, setLanguagesAvailaibles] = useState({});

  const [priceFilter, setPriceFilter] = useState("");

  const [areThey0CSP, setAreThey0CSP] = useState(false);

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
    console.log("test", data);
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
        price: 0,
        isFoil: data[i].hasnonfoil ? "No" : "Yes",
        isSigned: "No",
        set: currentSet ? currentSet.name : null,
        quantity: 1,
        condition: 2,
        lang: ENGLISH_LANG_ID,
        foreignDataObject: transformLanguagesArrayIntoObject(
          data[i].foreignData
        ),
      };
    }
    setCardsContext(contextCopy);

    //Choosing lang to display
    //The list of available foreign data :
    const arrayList_of_set_foreign_languages = [...data[0]?.foreignData];
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

  // console.log(cardsContext);

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
      .then((data) => {
        if (data.length > 0) {
          buildContextFromAPIResponse(data);
        } else {
          setAreThey0CSP(true);
        }
      })
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
        parseInt(process.env.REACT_APP_SHOP_BASELANG)
      )
        .then((resp) => {
          if (resp.data["hydra:totalItems"] === 0) {
            setAreThey0CSP(true);
          } else {
            setAreThey0CSP(false);
          }
          addFirstDisplayedPricesToContext(resp.data["hydra:member"]);
        })
        .then(setHasUpdatedPrices(true));
    }
  }, [cardsContext, buildContextFromAPIResponse]);

  var flagToDisplay = Object.keys(languagesAvailables).includes(
    userPreferences.cardsSetLang.toString()
  )
    ? languagesDefinition.langDefinitionIDShortName[
        userPreferences.cardsSetLang
      ]
    : languagesDefinition.langDefinitionIDShortName[ENGLISH_LANG_ID];

  var classFlags = isMobile && setName.length > 10 ? "blockFlags" : "";
  var classArrow = isMobile && setName.length > 10 ? " blockArrow" : "";
  var classFlagsDropDown =
    isMobile && setName.length > 10 ? " flagsDropDownMobileLongName" : "";

  const handleChange = (event) => {
    const value = event.target.value;

    //Checking if user is entering a coma for decimal input
    if (event.target.value[event.target.value.length - 1] === ".") {
      setPriceFilter(value);
    } else if (!isNaN(parseFloat(event.target.value))) {
      const newPrice = parseFloat(value);
      setPriceFilter(newPrice);
    } else if (event.target.value === "") {
      setPriceFilter(value);
    }
  };

  //Hook Intl to translate an attribute
  const intl = useIntl();

  // console.log("contextToCheck", cardsContext);
  // console.log("are they CSP ?", areThey0CSP);

  return (
    <>
      <div className="container">
        <div className="content-split">
          <SetList />
          <div className="last-modification">
            <div className="set-top-line">
              <h1>{setName}</h1>

              <div
                className={classFlags}
                onClick={() => setIsDisplayedLangChoice(!isDisplayedLangChoice)}
              >
                {Object.keys(cardsContext).length > 0 && (
                  <>
                    <img src={"/flags/25X13/" + flagToDisplay + ".png"}></img>
                    {Object.keys(languagesAvailables).length > 0 && (
                      <span className={"arrow-menu" + classArrow}></span>
                    )}
                  </>
                )}
                {isDisplayedLangChoice && (
                  <SetLangChoice
                    langsAvailable={languagesAvailables}
                    classFlagsDropDown={classFlagsDropDown}
                  />
                )}
              </div>
            </div>
            {isDisplayedLangChoice && (
              <div
                className="unclick"
                onClick={() => setIsDisplayedLangChoice(!isDisplayedLangChoice)}
              ></div>
            )}
            {isLoading && !isMobile && <OneSetLoader />}
            {isLoading && isMobile && (
              <>
                <SetListLoader /> <SetListLoader />
              </>
            )}
            {!isLoading && (
              <>
                <div className="filter-cards">
                  <p>
                    <FormattedMessage
                      id="app.OneSet.filterByPrice"
                      defaultMessage={`Filtrer By Price`}
                    />
                  </p>
                  <input
                    type="text"
                    placeholder={intl.formatMessage({
                      id: "app.OneSet.filter.placeholder",
                      defaultMessage: "Minimum price...",
                    })}
                    value={priceFilter}
                    onChange={(event) => handleChange(event)}
                  />
                </div>

                <Table className="zebra-table">
                  <Thead>
                    <Tr>
                      <Th>
                        <FormattedMessage
                          id="app.OneSet.cardName"
                          defaultMessage={`Card`}
                        />
                      </Th>
                      <Th>
                        <FormattedMessage
                          id="app.OneSet.language"
                          defaultMessage={`Language`}
                        />
                      </Th>
                      <Th>
                        <FormattedMessage
                          id="app.OneSet.condition"
                          defaultMessage={`Condition`}
                        />
                      </Th>
                      <Th>
                        <FormattedMessage
                          id="app.OneSet.foil"
                          defaultMessage={`Foil`}
                        />
                      </Th>
                      <Th>
                        <FormattedMessage
                          id="app.OneSet.signed"
                          defaultMessage={`Signed`}
                        />
                      </Th>
                      <Th>
                        <FormattedMessage
                          id="app.OneSet.quantity"
                          defaultMessage={`Quantity`}
                        />
                      </Th>
                      <Th>
                        <FormattedMessage
                          id="app.OneSet.price"
                          defaultMessage={`Price`}
                        />
                      </Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(cardsContext)
                      .filter((cardID) => {
                        if (priceFilter > 0) {
                          if (
                            parseFloat(cardsContext[cardID].price) <=
                            parseFloat(priceFilter)
                          ) {
                            return;
                          } else {
                            return cardID;
                          }
                        } else {
                          //If it's Near mint it must have a price to be displayed
                          //We chose Near Mint because it's the default condition displayed
                          if (
                            cardsContext[cardID].price > 0 &&
                            cardsContext[cardID].condition === 2
                          ) {
                            return cardID;
                          }
                          //If it's not near mint, it can be displayed all the time if asked by user (otherwise the card disappears from page if it had no price, not user friendly)
                          else if (cardsContext[cardID].condition !== 2) {
                            return cardID;
                          } else {
                            return;
                          }
                        }
                      })
                      .map((cardID, index) => {
                        return (
                          <CardLineOneSet
                            card={cardsContext[cardID]}
                            cardID={cardID}
                            index={index}
                            key={cardID}
                            handleAddSellingBasket={handleAddSellingBasket}
                            langIDToDisplay={langIDToDisplay}
                            langsAvailable={languagesAvailables}
                          />
                        );
                      })}
                  </Tbody>
                </Table>
              </>
            )}
            {/* If there are NO Card Shop Price in DB for this set */}
            {areThey0CSP && (
              <div className="noCSPMessage">
                <p>
                  <FormattedMessage
                    id="app.OneSet.noCSP.message"
                    defaultMessage={`There are currently no cards bought in this set.`}
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSet;
