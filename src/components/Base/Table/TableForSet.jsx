import React, { useContext } from "react";
import CardLineOneSet from "../../../components/CardLineOneSet";
import cardsOneSetContext from "../../../context/cardsOneSetContext";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import { FormattedMessage } from "react-intl";
import { isMobile } from "react-device-detect";

const TableForSet = ({
  arrayofIDcardToDisplay,
  handleAddSellingBasket,
  langIDToDisplay,
  languagesAvailables,
}) => {
  //Current Cards displayed in One Set Page
  const { cardsContext, setCardsContext } = useContext(cardsOneSetContext);

  return (
    <Table className="oneSet-table">
      <Thead>
        <Tr className="oneset-table-tr-head">
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
            <FormattedMessage id="app.OneSet.foil" defaultMessage={`Foil`} />
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
            <FormattedMessage id="app.OneSet.price" defaultMessage={`Price`} />
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {arrayofIDcardToDisplay.map((cardID, index) => {
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
  );
};

export default TableForSet;
