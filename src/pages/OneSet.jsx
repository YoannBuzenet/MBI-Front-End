import React, { useContext, useEffect } from "react";
import SetList from "../components/setList";
import SellingBasketContext from "../context/sellingBasket";

const OneSet = props => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  useEffect(() => {
    console.log(currentBasket);
  });

  function handleAddCardToCart(card) {
    setCurrentBasket([...currentBasket, card]);
  }

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
                        onClick={() => handleAddCardToCart({ lol: "card" })}
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
                        onClick={() => handleAddCardToCart({ lol2: "card2" })}
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
