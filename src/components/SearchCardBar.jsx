import React, { useState, useContext } from "react";
import { useEffect } from "react";
import cardsAPI from "../services/cardsAPI";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/authContext";
import { useIntl } from "react-intl";

const SearchCardBar = (props) => {
  // console.log("render");
  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const { authenticationInfos } = useContext(AuthContext);

  const [timer, setTimer] = useState(null);

  // console.log(authenticationInfos);

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
              .then((data) => setSearchResult(data)),
          200
        )
      );
    }
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
      <form className="search-card-form">
        <input
          type="search"
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
            searchResult.map((cardResult, index) => {
              // console.log(searchResult);
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
