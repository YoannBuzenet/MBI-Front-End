import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SetsContext from "../context/setsContext";
import SetListLoader from "./loaders/SetListLoader";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import setsAPI from "../services/setsAPI";
import { FormattedMessage } from "react-intl";
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
            <SetSearchBar />
            <table className="setList-table">
              <tbody>
                {allSets.length > 0 &&
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
