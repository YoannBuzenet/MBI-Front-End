import React, { useContext, useEffect, useState } from "react";
import SetList from "../components/SetList";
import SellingBasketContext from "../context/sellingBasket";
import CardLine from "../components/CardLine";
import SetsAPI from "../services/setsAPI";

const OneSet = ({ handleAddSellingBasket, match }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //State of the set, initialized as empty array, about to receive the complete card list
  const [cards, setCards] = useState([]);

  //Getting the id from params
  const { id = 1 } = match.params;

  //Fetching data when component is mounted
  useEffect(() => {
    SetsAPI.findOneById(id).then(data => setCards(data));
    console.log(SetsAPI.findOneById(id));
  }, [id]);

  return (
    <>
      <div className="container">
        <h1>NOM EDITION</h1>
        <div className="content-split">
          <SetList />
          <div className="last-modification">
            <table className="zebra-table">
              <thead>
                <tr>
                  <th>Nom de la carte</th>
                  <th>Langue</th>
                  <th>Condition</th>
                  <th>Quantité</th>
                  <th>Foil</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>
                {cards.map(card => (
                  <tr>
                    <CardLine
                      card={{
                        cardName: card.name,
                        set: "Invasion",
                        price: 2,
                        condition: "NM",
                        lang: "EN",
                        isFoil: "No",
                        uuid: card.uuid,
                        currency: "euros",
                        quantity: 4
                      }}
                      handleAddSellingBasket={handleAddSellingBasket}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSet;
