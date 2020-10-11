import React, { useState, useContext, useEffect, useRef } from "react";
import cardsAPI from "../services/cardsAPI";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useIntl } from "react-intl";

const SearchCardBar = ({ history, match }) => {
  // console.log("render");
  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const { authenticationInfos } = useContext(AuthContext);

  const [timer, setTimer] = useState(null);

  const WAIT_INTERVAL = 200;

  const prevSearchParams = usePrevious(match.params.search);

  // console.log(authenticationInfos);

  console.log("old", prevSearchParams);
  console.log(match.params.search);
  console.log(match);

  const handleChange = (event) => {
    setTimer(clearTimeout(timer));

    const value = event.currentTarget.value;
    setCurrentSearch(value);
    if (currentSearch.length >= 3) {
      setTimer(
        setTimeout(
          () =>
            cardsAPI
              .searchApproxByName(value)
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
                console.log(match.params.search === prevSearchParams);
                if (match.params.search === prevSearchParams) {
                  setSearchResult(data);
                }
              }),
          WAIT_INTERVAL
        )
      );
    } else {
      setSearchResult([]);
    }
  };

  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  // If user types "Enters" while typing we show it the result page
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchResult([]);
    setCurrentSearch("");
    history.push("/search/" + currentSearch);
  };

  const linkSearchCardBar =
    authenticationInfos.user &&
    authenticationInfos.user.roles &&
    authenticationInfos.user.roles.includes("ROLE_SHOP")
      ? "/shopadmin/card/"
      : "/card/";

  //Hook Intl to translate an attribute
  const intl = useIntl();

  const searchCardBarPlaceholderTranslated = intl.formatMessage({
    id: "app.searchCardBar.placeholder",
    defaultMessage: "Search...",
  });

  return (
    <>
      <form className="search-card-form" onSubmit={handleSubmit}>
        <input
          type="search"
          className="searchCardBar"
          placeholder={searchCardBarPlaceholderTranslated}
          value={currentSearch}
          onChange={(event) => handleChange(event)}
          onClick={(event) => {
            setSearchResult([]);
            handleChange(event);
          }}
        />
        <div className="search-result">
          {searchResult.length > 0 &&
            searchResult
              .filter((card) => card.edition.isonlineonly === 0)
              .map((cardResult, index) => {
                console.log(searchResult);
                // console.log(cardResult);
                return (
                  <Link
                    to={linkSearchCardBar + cardResult.name}
                    onClick={() => {
                      setSearchResult([]);
                    }}
                    key={cardResult.id}
                  >
                    <div className="card-line-result">
                      <span className="card-line-result-text">
                        {cardResult.name}
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

export default SearchCardBar;
