import React, { useContext, useEffect } from "react";
import SetList from "../components/SetList";
import SellingBasketContext from "../context/sellingBasket";
import CardLine from "../components/CardLine";

const OneSet = ({ handleAddSellingBasket }) => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  useEffect(() => {
    console.log(currentBasket);
  });

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
                <tr>
                  <CardLine
                    card={{
                      cardName: "Dague de vif-argent",
                      set: "Invasion",
                      price: 2,
                      condition: "NM",
                      lang: "EN",
                      isFoil: "No",
                      uuid: "9215-ddfsdf-9898-dsfdcww",
                      currency: "euros",
                      quantity: 4
                    }}
                    handleAddSellingBasket={handleAddSellingBasket}
                  />
                </tr>
                <tr>
                  <CardLine
                    card={{
                      cardName: "Fortune dans le travail",
                      set: "Invasion",
                      price: 2,
                      condition: "NM",
                      lang: "EN",
                      isFoil: "No",
                      uuid: "9215-ddfsdf-9898-dsfdcwww",
                      currency: "euros",
                      quantity: 4
                    }}
                    handleAddSellingBasket={handleAddSellingBasket}
                  />
                </tr>
                <tr>
                  <CardLine
                    card={{
                      cardName: "Espoir et révélation",
                      set: "Invasion",
                      price: 2,
                      condition: "NM",
                      lang: "EN",
                      isFoil: "No",
                      uuid: "9215-ddfsdf-9898-dsfdcwwww",
                      currency: "euros",
                      quantity: 4
                    }}
                    handleAddSellingBasket={handleAddSellingBasket}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSet;
