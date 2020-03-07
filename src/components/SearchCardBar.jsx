import React, { useState } from "react";
import { useEffect } from "react";
import cardsAPI from "../services/cardsAPI";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchCardBar = props => {
  // console.log("render");
  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    //Preparing cancellation
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (currentSearch.length >= 3) {
      console.log("on y va bébé");
      cardsAPI
        .searchApproxByName(currentSearch, {
          cancelToken: source.token
        })
        .then(data => {
          console.log(data.data);
          const filteringArray = [];

          if (data.data.length > 0) {
            filteringArray.push(data.data[0]);
          }

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
    //return cancelation TO DO
    return () => source.cancel("");
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
              console.log(searchResult);
              console.log(cardResult);
              return (
                <Link
                  to={"/shopadmin/card/" + cardResult.name}
                  onClick={() => {
                    setSearchResult([]);
                  }}
                  key={cardResult.id}
                >
                  <div className="card-line-result">{cardResult.name}</div>
                </Link>
              );
            })}
        </div>
      </form>
    </>
  );
};

export default SearchCardBar;
