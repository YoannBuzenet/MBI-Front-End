import React from "react";

const EditionChoosingModal = ({ editionInformations, currentCard }) => {
  console.log(editionInformations);
  return (
    <>
      {/* TODO METTRE UN ONCLICK DISABLE PARENT STATE ON MODAL */}
      <div className="blackSheet"></div>
      <div className="edition-modal">
        CHANGER L'EDITION
        <select value={currentCard.set}>
          {editionInformations &&
            editionInformations.map(card => (
              <option>{card.edition.name}</option>
            ))}
        </select>
      </div>
    </>
  );
};

export default EditionChoosingModal;
