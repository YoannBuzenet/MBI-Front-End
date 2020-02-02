import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";

const LastModifications = props => {
  //Current Selling Request Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  return (
    <>
      <div className="last-modification">
        <h2>Les dernières modifications</h2>
        <div className="all-cards">
          <div className="card">
            <div className="card-picture">
              <img src="https://placehold.it/100x175" alt="" />
            </div>
            <div className="card-infos">
              <div className="card-title">Card 1</div>
              <div className="card-language">English</div>
              <div className="card-condition">NM</div>
              <div className="card-price">3€</div>
              <form action="">
                QTE
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
                <i
                  className="fas fa-plus-circle add-item-basket"
                  onClick={() =>
                    setCurrentBasket([
                      ...currentBasket,
                      {
                        cardName: "Foret de la Yavimaya",
                        set: "Invasion",
                        price: 2,
                        condition: "NM",
                        lang: "EN",
                        isFoil: "No",
                        uuid: "9215-ddfsdf-9898-dsfd",
                        currency: "euros",
                        quantity: 4
                      }
                    ])
                  }
                ></i>
              </form>
            </div>
          </div>
          <div className="card">
            <div className="card-picture">
              <img src="https://placehold.it/100x175" alt="" />
            </div>
            <div className="card-infos">
              <div className="card-title">Card 1</div>
              <div className="card-language">English</div>
              <div className="card-condition">NM</div>
              <div className="card-price">3€</div>
              <form action="">
                QTE
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
                <i
                  className="fas fa-plus-circle add-item-basket"
                  onClick={() =>
                    setCurrentBasket([
                      ...currentBasket,
                      {
                        cardName: "Foret de la Yavimaya",
                        set: "Invasion",
                        price: 2,
                        condition: "NM",
                        lang: "EN",
                        isFoil: "No",
                        uuid: "9215-ddfsdf-9898-dsfd",
                        currency: "euros",
                        quantity: 4
                      }
                    ])
                  }
                ></i>
              </form>
            </div>
          </div>
          <div className="card">
            <div className="card-picture">
              <img src="https://placehold.it/100x175" alt="" />
            </div>
            <div className="card-infos">
              <div className="card-title">Card 1</div>
              <div className="card-language">English</div>
              <div className="card-condition">NM</div>
              <div className="card-price">3€</div>
              <form action="">
                QTE
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
                <i
                  className="fas fa-plus-circle add-item-basket"
                  onClick={() =>
                    setCurrentBasket([
                      ...currentBasket,
                      {
                        cardName: "Foret de la Yavimaya",
                        set: "Invasion",
                        price: 2,
                        condition: "NM",
                        lang: "EN",
                        isFoil: "No",
                        uuid: "9215-ddfsdf-9898-dsfd",
                        currency: "euros",
                        quantity: 4
                      }
                    ])
                  }
                ></i>
              </form>
            </div>
          </div>
          <div className="card">
            <div className="card-picture">
              <img src="https://placehold.it/100x175" alt="" />
            </div>
            <div className="card-infos">
              <div className="card-title">Card 1</div>
              <div className="card-language">English</div>
              <div className="card-condition">NM</div>
              <div className="card-price">3€</div>
              <form action="">
                QTE
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
                <i
                  className="fas fa-plus-circle add-item-basket"
                  onClick={() =>
                    setCurrentBasket([
                      ...currentBasket,
                      {
                        cardName: "Foret de la Yavimaya",
                        set: "Invasion",
                        price: 2,
                        condition: "NM",
                        lang: "EN",
                        isFoil: "No",
                        uuid: "9215-ddfsdf-9898-dsfd",
                        currency: "euros",
                        quantity: 4
                      }
                    ])
                  }
                ></i>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastModifications;
