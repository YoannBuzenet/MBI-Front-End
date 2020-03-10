import React, { useContext, useEffect } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellRequestValidation from "../components/validationSellRequest/SellRequestValidation";
import CardLineSellingBasket from "../components/CardLineSellingBasket";
import canSubmitContext from "../context/canSubmitSellRequestContext";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const MyCurrentSellRequest = ({ history, checkForDuplicates }) => {
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  return (
    <>
      <div className="all-content sell-request">
        <div className="left-content"></div>
        <div className="main-content">
          <h1>Ma demande de rachat</h1>
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <th>Nom de la carte</th>
                <th>Edition</th>
                <th>Langue</th>
                <th>Etat</th>
                <th>Foil</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Total</th>
                <th></th>
              </Tr>
            </Thead>
            <Tbody>
              {currentBasket.length > 0
                ? currentBasket.map((card, index) => {
                    return (
                      <CardLineSellingBasket
                        card={card}
                        key={parseInt(card["@id"].substr(7))}
                        indexCard={index}
                      />
                    );
                  })
                : null}

              <Tr className="total-line">
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>

                <Td>
                  <span>Total cartes : </span>
                  {currentBasket.reduce((total, card) => {
                    return total + card.quantity;
                  }, 0)}
                </Td>
                <Td>
                  <span>Total : </span>
                  {currentBasket.reduce((total, card) => {
                    return total + card.price * card.quantity;
                  }, 0)}
                </Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
        <div className="right-content">
          <SellRequestValidation
            history={history}
            checkForDuplicates={checkForDuplicates}
          />
        </div>
      </div>
    </>
  );
};

export default MyCurrentSellRequest;
