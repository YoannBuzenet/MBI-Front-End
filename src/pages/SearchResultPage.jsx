import React, { useEffect, useContext, useState } from "react";
import cardsAPI from "../services/cardsAPI";

const SearchResultPage = ({ match, history }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    cardsAPI
      .searchApproxByName(match.params.search)
      .then((data) => {
        console.log(data.data);
        const filteringArray = [];

        if (data.data.length > 0) {
          filteringArray.push(data.data[0]);
        }

        for (let i = 0; i < data.data.length; i++) {
          var isAlreadyHere = false;

          for (let j = 0; j < filteringArray.length; j++) {
            if (data.data[i].name === filteringArray[j].name) {
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
      .then((data) => {
        setSearchResult(data);
        setisLoading(false);
      });
  }, [match.params.search]);

  console.log(searchResult, isLoading);
  return (
    <>
      Search Results
      <div>
        {searchResult.map((card) => (
          <p>Card</p>
        ))}
        {!isLoading &&
          Array.isArray(searchResult) &&
          searchResult.length === 0 && <p>Pas de cartes</p>}
      </div>
    </>
  );
};

export default SearchResultPage;
