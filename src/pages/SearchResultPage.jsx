import React, { useEffect, useContext, useState } from "react";
import cardsAPI from "../services/cardsAPI";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import CardLineSearchResult from "../components/CardLineSearchResult";
import { FormattedMessage, useIntl } from "react-intl";

const SearchResultPage = ({ match, history }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    cardsAPI
      .searchApproxByName(match.params.search)
      .then((data) => {
        // console.log(data.data);
        const filteringArray = [];

        if (data.data.length > 0) {
          filteringArray.push(data.data[0]);
        }

        for (let i = 0; i < data.data.length; i++) {
          var isAlreadyHere = false;

          for (let j = 0; j < filteringArray.length; j++) {
            // console.log(filteringArray);
            if (data.data[i].name === filteringArray[j].name) {
              filteringArray.find((cardAlreadyThere) => {
                //Cumulating other sets
                if (cardAlreadyThere.hasOwnProperty("otherSets")) {
                  return (cardAlreadyThere.otherSets = [
                    ...cardAlreadyThere.otherSets,
                    data.data[i].edition,
                  ]);
                } else {
                  return (cardAlreadyThere.otherSets = [data.data[i].edition]);
                }
              });
              filteringArray.find((cardAlreadyThere) => {
                //Cumulating other foreign Languages
                if (cardAlreadyThere.hasOwnProperty("foreignData")) {
                  return (cardAlreadyThere.foreignData = [
                    ...cardAlreadyThere.foreignData,
                    ...data.data[i].foreignData,
                  ]);
                } else {
                  return (cardAlreadyThere.foreignData = [
                    ...data.data[i].foreignData,
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
        setisLoading(false);
      });
  }, [match.params.search]);

  console.log(searchResult);

  //   console.log(searchResult);
  return (
    <div className="container">
      <FormattedMessage
        id="app.SearchResultPage.title"
        defaultMessage={`Search Results for`}
      />{" "}
      "{match.params.search}"
      <div>
        <Table className="zebra-table searchResultPage">
          <Thead>
            <Tr>
              <Th>
                <FormattedMessage
                  id="app.SearchResultPage.table.head.name"
                  defaultMessage={`Name`}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(searchResult) &&
              searchResult.map((card) => (
                <CardLineSearchResult
                  card={card}
                  key={card.name}
                  history={history}
                />
              ))}
          </Tbody>
        </Table>
        {!isLoading &&
          Array.isArray(searchResult) &&
          searchResult.length === 0 && (
            <p>
              <FormattedMessage
                id="app.SearchResultPage.resuls.noResultForThisSearch"
                defaultMessage={`There were no results for this search.`}
              />
            </p>
          )}
      </div>
    </div>
  );
};

export default SearchResultPage;
