import React, { useContext } from "react";
import SellingBasketContext from "../context/sellingBasket";
import SellRequestValidation from "../components/validationSellRequest/SellRequestValidation";
import CardLineSellingBasket from "../components/CardLineSellingBasket";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FormattedMessage } from "react-intl";

const MyCurrentSellRequest = ({ history, checkForDuplicates }) => {
  const { currentBasket } = useContext(SellingBasketContext);
  // console.log(currentBasket);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  // const { errorList, setErrorList } = useContext(canSubmitContext);

  return (
    <>
      <div className="all-content sell-request">
        <div className="left-content"></div>
        <div className="main-content">
          <h1>
            <FormattedMessage
              id="app.Basket.title"
              defaultMessage={`My Sell Request`}
            />
          </h1>
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <Th>
                  <FormattedMessage
                    id="app.Basket.cardName"
                    defaultMessage={`Card`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.set"
                    defaultMessage={`Set`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.language"
                    defaultMessage={`Language`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.condition"
                    defaultMessage={`Condition`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.foil"
                    defaultMessage={`Foil`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.signed"
                    defaultMessage={`Signed`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.quantity"
                    defaultMessage={`Quantity`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.price"
                    defaultMessage={`Price`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.Basket.totalAmount"
                    defaultMessage={`Total`}
                  />
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentBasket.length > 0
                ? currentBasket.map((card, index) => {
                    const isFoil = card.isFoil === "Yes" ? 1 : 0;
                    const isSigned = card.isSigned === "Yes" ? 1 : 0;

                    return (
                      <CardLineSellingBasket
                        card={card}
                        key={parseInt(
                          "" +
                            card.id +
                            card.condition +
                            card.lang +
                            isFoil +
                            isSigned
                        )}
                        indexCard={index}
                      />
                    );
                  })
                : null}
            </Tbody>
          </Table>
          <p>
            <span>
              <FormattedMessage
                id="app.Basket.totalNumberCards"
                defaultMessage={`Number of cards : `}
              />
            </span>
            {currentBasket.reduce((total, card) => {
              return total + card.quantity;
            }, 0)}
          </p>
          <p>
            <span>
              <FormattedMessage
                id="app.Basket.totalBasketAmount"
                defaultMessage={`Total : `}
              />
            </span>
            {currentBasket.reduce((total, card) => {
              return total + card.price * card.quantity;
            }, 0)}
          </p>
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
