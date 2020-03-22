import React, { useContext, useEffect, useState } from "react";
import SetList from "../components/SetList";
import CardLineOneSet from "../components/CardLineOneSet";
import SetsAPI from "../services/setsAPI";
import SetsContext from "../context/setsContext";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import CardShopPriceAPI from "../services/CardShopPriceAPI";
import cardsOneSetContext from "../context/cardsOneSetContext";

const OneSet = ({ handleAddSellingBasket, match }) => {
  //Current Cards displayed in One Set Page
  const { cardsContext, setCardsContext } = useContext(cardsOneSetContext);

  //State of the set, initialized as empty array, about to receive the complete card list
  const [cards, setCards] = useState([]);

  //Getting the id from params
  const { id = 1 } = match.params;

  //We are getting the context of all sets, to fetch the set name in the good language
  const { allSets, setAllSets } = useContext(SetsContext);

  //Creating a state to be able to write the set name
  const [setName, setSetName] = useState("");

  const buildContextFromAPIResponse = data => {
    for (let i = 0; i < data.length; i++) {
      cardsContext[data[i]["@id"].substr(7)] = {
        hasfoil: data[i].hasfoil,
        hasnonfoil: data[i].hasnonfoil,
        name: data[i].name,
        scryfallid: data[i].scryfallid,
        uuid: data[i].uuid,
        foreignData: data[i].foreignData
      };
    }
    console.log(cardsContext);
    return console.log(data);
    //get every array element and put it nested into object
    //set context
  };

  //Fetching data when component is mounted
  //Component update when
  //      - ID is updated (user clicked on a new set)
  //      - AllSets are updated (which allow to reload when allSets are completely loaded and to display the set name)
  useEffect(() => {
    SetsAPI.findOneById(id).then(data => buildContextFromAPIResponse(data));

    //We get the current set Name if all the sets are loaded
    if (allSets.length > 0) {
      const currentSet = allSets.find(element => element.id == id);
      setSetName(currentSet.name);
    }

    //Getting user back to the top page when clicking on a set link
    window.scrollTo(0, 0);
  }, [id, allSets]);

  // useEffect(() => {
  //   if (cards.length > 0) {
  //     const arrayOfID = cards.map(card => card["@id"].substr(7));
  //     CardShopPriceAPI.getArrayofPrices(arrayOfID, 3).then(data =>
  //       data.data['hydra:member'].map(card => (cards.map(cardState) => card.id === cardState.id ? cardState.price = card.price : cardState))).then(setCards(data))
  //     );
  //   }
  //   // add : .then (ask API prices .then add it to the array of cards on which we .map)
  // }, [cards]);

  return (
    <>
      <div className="container">
        <div className="content-split">
          <SetList />
          <div className="last-modification">
            <h1>{setName}</h1>
            <Table className="zebra-table">
              <Thead>
                <Tr>
                  <Th>Nom de la carte</Th>
                  <Th>Langue</Th>
                  <Th>Condition</Th>
                  <Th>Foil</Th>
                  <Th>Quantité</Th>
                  <Th>Prix</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* object.keys puis .map bidule[keys] et ça déroule */}
                {cards.map((card, index) => {
                  return (
                    <CardLineOneSet
                      card={card}
                      handleAddSellingBasket={handleAddSellingBasket}
                      key={parseInt(card["@id"].substr(7))}
                      setName={setName}
                      displaySets={false}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSet;
