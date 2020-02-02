import React, { useContext, useEffect } from "react";
import SetList from "../components/SetList";
import SellingBasketContext from "../context/sellingBasket";

const OneSet = props => {
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
            <form action="" className="center-text">
              <table className="zebra-table">
                <thead></thead>
                <tbody>
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
                              cardName: "Dague de vif-argent",
                              set: "Invasion",
                              price: 2,
                              condition: "NM",
                              lang: "EN",
                              isFoil: "No",
                              uuid: "9215-ddfsdf-9898-dsfdc",
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
