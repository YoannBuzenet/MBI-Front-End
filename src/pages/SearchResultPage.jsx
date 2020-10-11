import React, { useEffect, useContext, useState } from "react";
import cardsAPI from "../services/cardsAPI";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const SearchResultPage = ({ match, history }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  console.log("match from search result page", match);

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

  console.log(searchResult);
  return (
    <div className="container">
      Search Results : {match.params.search}
      <div>
        <Table className="zebra-table">
          <Thead>
            <Tr>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(searchResult) &&
              searchResult.map((card) => (
                <Tr>
                  <Td>{card.name}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        {!isLoading &&
          Array.isArray(searchResult) &&
          searchResult.length === 0 && <p>Pas de cartes</p>}
      </div>
    </div>
  );
};

export default SearchResultPage;
