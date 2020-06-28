import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import SetsContext from "../context/setsContext";
import { Link } from "react-router-dom";

const SetSearchBar = (props) => {
  //Hook Intl to translate an attribute
  const intl = useIntl();

  const searchSETSBarPlaceholderTranslated = intl.formatMessage({
    id: "app.setList.searchSetsBar.placeholder",
    defaultMessage: "Search a set...",
  });

  const { allSets, setAllSets } = useContext(SetsContext);

  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const WAIT_INTERVAL = 200;
  const [timer, setTimer] = useState(null);

  console.log(allSets);
  console.log(searchResult);

  const handleChange = (event) => {
    setTimer(clearTimeout(timer));
    const value = event.currentTarget.value;
    setCurrentSearch(value);

    setTimer(
      setTimeout(() => {
        if (value.length >= 2) {
          setSearchResult(
            allSets.filter((oneSet) => {
              let valueToLowerCase = value.toLowerCase();
              let setNameLowerCase = oneSet.name.toLowerCase();
              return setNameLowerCase.includes(valueToLowerCase);
            })
          );
        } else {
          setSearchResult([]);
        }
      }, WAIT_INTERVAL)
    );
  };

  return (
    <>
      <form className="search-card-form">
        <input
          type="search"
          className="searchCardBar"
          placeholder={searchSETSBarPlaceholderTranslated}
          value={currentSearch}
          onChange={(event) => handleChange(event)}
          onClick={(event) => {
            setSearchResult([]);
            handleChange(event);
          }}
        />
        <div className="search-result">
          {searchResult.length > 0 &&
            searchResult.map((setsResults, index) => {
              console.log(searchResult);
              // console.log(setsResults);
              return (
                <Link
                  to={"/sets/" + setsResults.id}
                  onClick={() => {
                    setSearchResult([]);
                  }}
                  key={setsResults.id}
                >
                  <div className="card-line-result">
                    <span className="card-line-result-text">
                      {setsResults.name}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </form>
    </>
  );
};

export default SetSearchBar;
