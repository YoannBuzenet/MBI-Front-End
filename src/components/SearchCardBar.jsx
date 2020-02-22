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
        .searchApproxByName(currentSearch)
        .then(data => {
          console.log(data.data);
          const filteringArray = [];
          filteringArray.push(data.data[0]);

          for (let i = 0; i < data.data.length; i++) {
            var isAlreadyHere = false;

            for (let j = 0; j < filteringArray.length; j++) {
              if (data.data[i].name == filteringArray[j].name) {
                isAlreadyHere = true;
              }
            }
            if (!isAlreadyHere) {
              filteringArray.push(data.data[i]);
            }
          }
          // console.log(filteringArray);
          return filteringArray;
          // return data.data;
        })
        .then(data => setSearchResult(data));
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
