import React, { useContext, useEffect } from "react";
import SetList from "../components/SetList";
import SellingBasketContext from "../context/sellingBasket";

const OneSet = props => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  useEffect(() => {
    console.log(currentBasket);
  });

  const handleAddSellingBasket = (currentBasket, card) => {
    for (var i = 0; i < currentBasket.length; i++) {
      if (
        currentBasket[i].cardName === card.cardName &&
        currentBasket[i].set === card.set &&
        currentBasket[i].price === card.price &&
        currentBasket[i].condition === card.condition &&
        currentBasket[i].lang === card.lang &&
        currentBasket[i].isFoil === card.isFoil &&
        currentBasket[i].uuid === card.uuid
      ) {
        const updatedCard = currentBasket[i];
        updatedCard.quantity += card.quantity;

        // setCurrentbasket by adding quantity of the card currently added to the selling basket
        setCurrentBasket(
          currentBasket.map(card => {
            return card.cardName === updatedCard.cardName &&
              card.set === updatedCard.set &&
              card.price === updatedCard.price &&
              card.condition === updatedCard.condition &&
              card.lang === updatedCard.lang &&
              card.isFoil === updatedCard.isFoil &&
              card.uuid === updatedCard.uuid
              ? { ...updatedCard }
              : card;
          })
        );
        break;
      } else {
        setCurrentBasket([...currentBasket, card]);
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>NOM EDITION</h1>
        <div className="content-split">
          <SetList />
          <div className="last-modification">
            <form action="" className="center-text">
              <table className="zebra-table">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>Dague de vif-argent</td>
                    <td>LANGUE</td>
                    <td>
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      ETAT
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      QTE
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      FOIL
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      PRIX
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      <i
                        className="fas fa-plus-circle add-item-basket"
                        onClick={() =>
                          handleAddSellingBasket(currentBasket, {
                            cardName: "Dague de vif-argent",
                            set: "Invasion",
                            price: 2,
                            condition: "NM",
                            lang: "EN",
                            isFoil: "No",
                            uuid: "9215-ddfsdf-9898-dsfdc",
                            currency: "euros",
                            quantity: 4
                          })
                        }
                      ></i>
                    </td>
                  </tr>
                  <tr>
                    <td>NOM CARTE</td>
                    <td>LANGUE</td>
                    <td>
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      ETAT
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      QTE
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      FOIL
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      PRIX
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      <i
                        className="fas fa-plus-circle add-item-basket"
                        onClick={() =>
                          setCurrentBasket([
                            ...currentBasket,
                            {
                              cardName: "Sorcier Sybarite",
                              set: "Planeshift",
                              price: 2,
                              condition: "NM",
                              lang: "EN",
                              isFoil: "No",
                              uuid: "9215-ddfsdf-9898-dsfdv",
                              currency: "euros",
                              quantity: 4
                            }
                          ])
                        }
                      ></i>
                    </td>
                  </tr>
                  <tr>
                    <td>NOM CARTE</td>
                    <td>LANGUE</td>
                    <td>
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      ETAT
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      QTE
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      FOIL
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      PRIX
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </td>
                    <td>
                      <i className="fas fa-plus-circle add-item-basket"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSet;
