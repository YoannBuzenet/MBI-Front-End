import React, { useState, useContext, useEffect, useRef } from "react";
import cardsAPI from "../services/cardsAPI";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useIntl } from "react-intl";
import { matchPath } from "react-router";

const SearchCardBar = ({ history }) => {
  // console.log("render");
  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const { authenticationInfos } = useContext(AuthContext);

  const [searchCopy, setSearchCopy] = useState("");

  const [timer, setTimer] = useState(null);

  const WAIT_INTERVAL = 200;

  // console.log(authenticationInfos);

  const match = matchPath(history.location.pathname, {
    path: "/search/:search?",
    exact: true,
    strict: false,
  });

  const handleChange = (event) => {
    setTimer(clearTimeout(timer));

    const value = event.currentTarget.value;
    setCurrentSearch(value);
    //We keep track of user search to know if we display search result
    //If the URL changes and doesn't match the user search anymore, we know the page changed
    setSearchCopy(value);
    if (currentSearch.length >= 3) {
      setTimer(
        setTimeout(
          () =>
            cardsAPI
              .searchApproxByName(value)
              .then((data) => {
                // console.log(data.data);
                const filteringArray = [];

                if (data.data.length > 0) {
                  filteringArray.push(data.data[0]);
                }

                for (let i = 0; i < data.data.length; i++) {
                  var isAlreadyHere = false;

                  for (let j = 0; j < filteringArray.length; j++) {
                    console.log(filteringArray);
                    if (data.data[i].name === filteringArray[j].name) {
                      filteringArray.find((cardAlreadyThere) => {
                        if (cardAlreadyThere.hasOwnProperty("otherSets")) {
                          return (cardAlreadyThere.otherSets = [
                            ...cardAlreadyThere.otherSets,
                            data.data[i].edition,
                          ]);
                        } else {
                          return (cardAlreadyThere.otherSets = [
                            data.data[i].edition,
                          ]);
                        }
                      });
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
              }),
          WAIT_INTERVAL
        )
      );
    } else {
      setSearchResult([]);
    }
  };

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

  console.log("search copy", searchCopy);
  console.log("param", match?.params?.search);

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
          {match?.params?.search !== searchCopy &&
            searchResult.length > 0 &&
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
