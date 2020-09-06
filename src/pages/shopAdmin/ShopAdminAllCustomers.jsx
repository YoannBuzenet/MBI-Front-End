import React, { useEffect, useState } from "react";
import customersAPI from "../../services/customersAPI";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import TableLoader from "../../components/loaders/TableLoader";
import errorHandlingAPI from "../../services/errorHandlingAPI";
import { isMobile } from "react-device-detect";
import SetListLoader from "../../components/loaders/SetListLoader";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

const ShopAdminAllCustomers = (props) => {
  const [listCustomers, setListCustomers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [numberOfPages, setNumberOfPages] = useState(1);

  let history = useHistory();

  //Preparing the variable that allow Promises clean up on Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    handlePageChange(1);
    return () => source.cancel("");
  }, []);

  const handlePageChange = (pageNumberRequested) => {
    customersAPI
      .findAll(pageNumberRequested, {
        cancelToken: source.token,
      })
      .then((response) => {
        setListCustomers(response.data["hydra:member"]);

        //If there are several pages
        if (response?.data?.["hydra:view"]?.["hydra:last"]) {
          setNumberOfPages(
            parseInt(response.data["hydra:view"]["hydra:last"].substr(14))
          );
        }
        setCurrentPageNumber(pageNumberRequested);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        return errorHandlingAPI.check401Unauthorized(error);
      });
  };

  return (
    <>
      <h1>
        <FormattedMessage
          id="app.shop.AllCustomers.title"
          defaultMessage={`All Customers`}
        />
      </h1>
      <div className="container">
        {isLoading && !isMobile && <TableLoader />}
        {isLoading && isMobile && (
          <>
            <SetListLoader />
            <SetListLoader />
          </>
        )}
        {!isLoading && (
          <Table className="zebra-table">
            <Thead>
              <Tr>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllCustomers.reference"
                    defaultMessage={`Reference`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllCustomers.customerLastName"
                    defaultMessage={`Last Name`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllCustomers.customerFirstName"
                    defaultMessage={`First Name`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.AllCustomers.NumberOfSellRequests"
                    defaultMessage={`Sell Requests`}
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {listCustomers.length > 0 &&
                listCustomers.map((customer) => {
                  // console.log(customer);

                  return (
                    <Tr
                      key={customer.id}
                      onClick={() =>
                        history.push("/shopadmin/customers/" + customer.id)
                      }
                      className="cursor-pointer"
                    >
                      <Td>{customer.id}</Td>

                      <Td>{customer.nom}</Td>
                      <Td>{customer.prenom}</Td>
                      <Td>{customer.sellrequest.length || "0"}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        )}
      </div>
      {numberOfPages > 1 && (
        <div className="paginationContainer">
          <Pagination
            count={numberOfPages}
            page={currentPageNumber}
            onChange={(event, pageNumberClicked) =>
              handlePageChange(pageNumberClicked)
            }
          />
        </div>
      )}
    </>
  );
};

export default ShopAdminAllCustomers;
