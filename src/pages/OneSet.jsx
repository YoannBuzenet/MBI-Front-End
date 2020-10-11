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
import SetLangChoice from "../components/SetLangChoice";
import languagesDefinition from "../definitions/languagesDefinition";
import userPreferencesContext from "../context/userPreferenceContext";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

//MUI controls

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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

  const [isFilteringByFoils, setIsFilteringByFoils] = useState(false);

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
        price: null,
        isFoil: data[i].hasnonfoil ? "No" : "Yes",
        isSigned: "No",
        set: currentSet ? currentSet.name : null,
        setId: idSet,
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
  //This functions is also written in cardPage
  const addFirstDisplayedPricesToContext = (data) => {
    const contextCopy = { ...cardsContext };
    console.log(cardsContext);

    for (let i = 0; i < data.length; i++) {
      //Searching for baselang based CSP NM NON FOIL
      if (
        data[i].language.substr(11) == process.env.REACT_APP_SHOP_BASELANG &&
        data[i].isFoil === false &&
        data[i].cardCondition.substr(17) == 2 &&
        contextCopy[data[i].card.substr(7)].price === null
      ) {
        console.log(contextCopy[data[i].card.substr(7)]);
        console.log("trying to mettre en avant baselang", data[i]);
        contextCopy[data[i].card.substr(7)].price = data[i].price;
        contextCopy[data[i].card.substr(7)].isFoil = data[i].isFoil
          ? "Yes"
          : "No";
        contextCopy[data[i].card.substr(7)].lang = parseInt(
          process.env.REACT_APP_SHOP_BASELANG
        );
      }
    }
    for (let i = 0; i < data.length; i++) {
      //Searching for baselang based CSP NM FOIL
      if (
        data[i].language.substr(11) == process.env.REACT_APP_SHOP_BASELANG &&
        data[i].isFoil === true &&
        data[i].cardCondition.substr(17) == 2 &&
        contextCopy[data[i].card.substr(7)].price === null
      ) {
        console.log(contextCopy[data[i].card.substr(7)]);
        console.log("trying to mettre en avant baselang", data[i]);
        contextCopy[data[i].card.substr(7)].price = data[i].price;
        contextCopy[data[i].card.substr(7)].isFoil = data[i].isFoil
          ? "Yes"
          : "No";
        contextCopy[data[i].card.substr(7)].lang = parseInt(
          process.env.REACT_APP_SHOP_BASELANG
        );
      }
    }
    for (let i = 0; i < data.length; i++) {
      //Searching for baselang based CSP NM NO MATTER LANGUAGE (context is updated accordingly)
      if (
        data[i].isFoil === false &&
        data[i].cardCondition.substr(17) == 2 &&
        contextCopy[data[i].card.substr(7)].price === null
      ) {
        console.log(contextCopy[data[i].card.substr(7)]);

        contextCopy[data[i].card.substr(7)].lang = data[i].language.substr(11);
        contextCopy[data[i].card.substr(7)].price = data[i].price;
        contextCopy[data[i].card.substr(7)].isFoil = data[i].isFoil
          ? "Yes"
          : "No";
      }
    }
    for (let i = 0; i < data.length; i++) {
      //If no price is already defined after baselang check, we just add the first CSP
      if (contextCopy[data[i].card.substr(7)]?.price === null) {
        console.log(contextCopy[data[i].card.substr(7)]);
        contextCopy[data[i].card.substr(7)].price = data[i].price;
        contextCopy[data[i].card.substr(7)].isFoil = data[i].isFoil
          ? "Yes"
          : "No";
        contextCopy[data[i].card.substr(7)].condition = data[
          i
        ].cardCondition.substr(17);
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
    const value = parseFloat(event.target.value);

    setPriceFilter(value);
  };

  //Hook Intl to translate an attribute
  const intl = useIntl();

  // Buttons Mui
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

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
                  <div className="filterByFoils">
                    <span>AFFICHER LES FOILS</span>

                    <Button
                      variant={isFilteringByFoils ? "outlined" : "contained"}
                      className="doFilterByFoil"
                      onClick={(e) => setIsFilteringByFoils(false)}
                      color={isFilteringByFoils ? "default" : "primary"}
                    >
                      Oui
                    </Button>
                    <Button
                      variant={isFilteringByFoils ? "contained" : "outlined"}
                      className="doNOTFilterByFoil"
                      onClick={(e) => setIsFilteringByFoils(true)}
                      color={isFilteringByFoils ? "primary" : "default"}
                    >
                      Non
                    </Button>
                  </div>

                  <div className="filterbyPrice">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Prix
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={priceFilter}
                        onChange={handleChange}
                        label="Prix"
                      >
                        <MenuItem value="">
                          <em>Aucun</em>
                        </MenuItem>
                        <MenuItem value={0.1}>0.1</MenuItem>
                        <MenuItem value={0.5}>0.5</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
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
                            typeof cardsContext[cardID].price === "number" &&
                            parseFloat(cardsContext[cardID].price) <=
                              parseFloat(priceFilter) &&
                            !cardsContext[cardID].hasOwnProperty(
                              "wasModifiedByUser"
                            )
                          ) {
                            return false;
                          } else if (
                            cardsContext[cardID].price === null &&
                            !cardsContext[cardID].hasOwnProperty(
                              "wasModifiedByUser"
                            )
                          ) {
                            return false;
                          } else {
                            return true;
                          }
                        } else {
                          //If it's Near mint it must have a price to be displayed
                          //We chose Near Mint because it's the default condition displayed
                          if (
                            cardsContext[cardID].price !== null &&
                            cardsContext[cardID].price > 0 &&
                            cardsContext[cardID].condition === 2
                          ) {
                            return true;
                          }
                          // A card non null is a card whose price has been asked by user. Therefore even if it's 0 we let it  displayed.
                          else if (cardsContext[cardID].price !== null) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      })
                      .filter((cardID) => {
                        if (
                          isFilteringByFoils &&
                          !cardsContext[cardID].hasOwnProperty(
                            "wasModifiedByUser"
                          )
                        ) {
                          return cardsContext[cardID].isFoil !== "Yes";
                        } else {
                          return true;
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
