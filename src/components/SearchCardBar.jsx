import React, { useState } from "react";
import { useEffect } from "react";
import cardsAPI from "../services/cardsAPI";

const SearchCardBar = props => {
  console.log("render");
  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (currentSearch.length >= 3) {
      console.log("on y va bébé");
      cardsAPI
        .getByName(currentSearch)
        .then(data => setSearchResult(data.data["hydra:member"]));
    }
  }, [currentSearch]);

  const handleChange = event => {
    const value = event.currentTarget.value;
    setCurrentSearch(value);
  };

  return (
    <>
      <form className="search-card-form">
        <input
          type="search"
          placeholder="Rechercher une carte..."
          value={currentSearch}
          onChange={event => handleChange(event)}
          onClick={event => {
            setSearchResult([]);
            handleChange(event);
          }}
        />
        <div className="search-result">
          {searchResult.length > 0 &&
            searchResult.map((cardResult, index) => {
              return (
                <div className="card-line-result" key={cardResult.id}>
                  {cardResult.name}
                </div>
              );
            })}
        </div>
      </form>
    </>
  );
};

export default SearchCardBar;
