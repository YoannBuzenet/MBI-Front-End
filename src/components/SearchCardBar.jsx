import React, { useState } from "react";
import { useEffect } from "react";
import cardsAPI from "../services/cardsAPI";

const SearchCardBar = props => {
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(() => {
    if (currentSearch.length >= 3) {
      console.log("on y va bébé");
      cardsAPI.getByName(currentSearch).then(data => console.log(data));
    }
  });

  const handleChange = event => {
    const value = event.currentTarget.value;
    setCurrentSearch(value);
  };

  return (
    <>
      <form>
        <input
          type="search"
          placeholder="Rechercher une carte..."
          value={currentSearch}
          onChange={event => handleChange(event)}
        />
      </form>
    </>
  );
};

export default SearchCardBar;
