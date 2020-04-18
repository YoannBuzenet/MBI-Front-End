import React from "react";
import CSSLoaderWaitingSpiral from "./loaders/CSSLoaderWaitingSpiral";
import { FormattedMessage } from "react-intl";

const EditionChoosingModal = ({
  editionInformations,
  currentCard,
  updateDBAndContextWithNewEdition,
  setIsModal,
}) => {
  console.log(editionInformations);
  return (
    <>
      {/* TODO METTRE UN ONCLICK DISABLE PARENT STATE ON MODAL */}
      <div className="blackSheet" onClick={() => setIsModal(false)}></div>
      <div className="edition-modal">
        <p>
          <FormattedMessage
            id="app.shop.editionUpdateModal"
            defaultMessage={`UPDATE CURRENT SET`}
          />
        </p>
        {editionInformations.length === 0 && (
          <div className="edition-modal-loader">
            <CSSLoaderWaitingSpiral />
          </div>
        )}
        <div>
          {editionInformations.length > 0 && (
            <select
              value="Choose a set"
              onChange={(event) => updateDBAndContextWithNewEdition(event)}
            >
              {editionInformations &&
                editionInformations
                  .map((card, index) => (
                    <option value={index} key={card.id}>
                      {card.edition.name}
                    </option>
                  ))
                  .concat([
                    <option key={40000}>
                      <FormattedMessage
                        id="app.shop.editionUpdateModal.chooseSet"
                        defaultMessage={`Choose a set`}
                      />
                    </option>,
                  ])}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default EditionChoosingModal;
