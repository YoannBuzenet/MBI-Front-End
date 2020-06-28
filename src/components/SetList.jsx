import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SetsContext from "../context/setsContext";
import SetListLoader from "./loaders/SetListLoader";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import setsAPI from "../services/setsAPI";
import { FormattedMessage, useIntl } from "react-intl";
import SetSearchBar from "./SetSearchBar";

const SetList = (props) => {
  const { allSets, setAllSets } = useContext(SetsContext);

  const [isLoading, setIsLoading] = useState(false);

  //sorting sets by their name before displaying them
  allSets.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  //Set List Initiliazation
  useEffect(() => {
    setIsLoading(true);
    //Check if last modification cookie is here and not EXP
    const localStorageAllSets = JSON.parse(
      window.localStorage.getItem("allSets")
    );
    const now = new Date().getTime();

    if (localStorageAllSets && localStorageAllSets.expirationDate > now) {
      setAllSets(localStorageAllSets.data);
      setIsLoading(false);
    } else {
      setsAPI
        .findAll()
        .then((data) => setAllSets(data))
        .then(() => setIsLoading(false));
    }
  }, []);

  //Set Search Bar

  //Hook Intl to translate an attribute
  const intl = useIntl();

  const searchSETSBarPlaceholderTranslated = intl.formatMessage({
    id: "app.setList.searchSetsBar.placeholder",
    defaultMessage: "Search a set...",
  });

  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const WAIT_INTERVAL = 200;
  const [timer, setTimer] = useState(null);

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
              return (
                setNameLowerCase.includes(valueToLowerCase) &&
                oneSet.isonlineonly === 0
              );
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
      <div className="left-div">
        {isMobile && <div className="margin-top-2rem"></div>}
        <h2>
          <FormattedMessage
            id="app.setList.title"
            defaultMessage={`All sets`}
          />
        </h2>

        {isLoading && <SetListLoader />}

        {!isLoading && (
          <>
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
              </form>
            </>
            <table className="setList-table">
              <tbody>
                {searchResult.length > 0 &&
                  searchResult.map((setsResults, index) => {
                    console.log(searchResult);
                    // console.log(setsResults);
                    return (
                      <tr key={setsResults.id}>
                        <td>
                          <Link
                            to={"/sets/" + setsResults.id}
                            className="setList-link"
                            onClick={() => {
                              setSearchResult([]);
                            }}
                            key={setsResults.id}
                          >
                            {setsResults.name}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                {searchResult.length === 0 &&
                  allSets.length > 0 &&
                  allSets
                    .filter((set) => set.isonlineonly === 0)
                    .map((set) => {
                      return (
                        <tr key={set.id}>
                          <td>
                            <Link
                              to={"/sets/" + set.id}
                              className="setList-link"
                            >
                              {set.name}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default SetList;
