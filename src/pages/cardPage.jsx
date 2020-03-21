import React, { useState, useEffect } from "react";

const CardPage = ({ match, history }) => {
  //STATE - current card name
  const [currentName, setCurrentName] = useState(match.params.cardName);

  //STATE - current Card Name decoded
  const [currentNameDecoded, setCurrentNameDecoded] = useState(
    decodeURI(currentName)
  );

  useEffect(() => {
    setCurrentName(match.params.cardName);
  }, [match.params.cardName]);

  useEffect(() => {
    setCurrentNameDecoded(currentName);
  }, [currentName]);

  return (
    <>
      <h1>{currentName}</h1>
      CECI EST UNE PAGE MDRRRRR HAHAHHAHAHH
    </>
  );
};

export default CardPage;
