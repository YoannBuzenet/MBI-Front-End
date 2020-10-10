import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import sellRequestAPI from "../../services/sellRequestAPI";
import StatusCalculator from "../../components/StatusCalculator";
import LastInformationCalculator from "../../components/LastInformationCalculator";
import CardLineShop from "../../components/shop/CardLineShop";
import CardLineShopStuck from "../../components/shop/CardLineShopStuck";
import AdminSellRequestContext from "../../context/adminSellRequestContext";
import ShopSellRequestStatusValidator from "../../components/shop/ShopSellRequestStatusValidator";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import OneLineLoader from "../../components/loaders/OneLineLoader";
import TableLoader from "../../components/loaders/TableLoader";
import OneBigLineLoader from "../../components/loaders/OneBigLineLoader";
import errorHandlingAPI from "../../services/errorHandlingAPI";
import { isMobile } from "react-device-detect";
import SetListLoader from "../../components/loaders/SetListLoader";
import { FormattedMessage, useIntl, IntlProvider } from "react-intl";
import priceUpdateAPI from "../../services/priceUpdateAPI";
import AuthContext from "../../context/authContext";
import shopAPI from "../../services/shopAPI";
import cardsAPI from "../../services/cardsAPI";
import SellRequestRecapPDF from "../../components/PDFtemplates/SellRequestTemplatePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SelectAppLangContext from "../../context/selectedAppLang";
import FeatherIcon from "feather-icons-react";

const ShopAdminOneSellRequest = ({ match }) => {
  const { id } = match.params;
  //Hook Intl to translate an attribute
  const intl = useIntl();

  const [isLoading, setIsLoading] = useState(true);

  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const { currentAdminSellRequest, setCurrentAdminSellRequest } = useContext(
    AdminSellRequestContext
  );
  // console.log(currentAdminSellRequest);
  // console.log(authenticationInfos);

  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  const [priceHaveBeenLoaded, setPriceHaveBeenLoaded] = useState(false);

  async function awaitPrices() {
    //Array of sell request cards here
    const promises = currentAdminSellRequest.sellRequests.map((card) => {
      return cardsAPI.getById(card.id);
    });
    const res = await Promise.all(promises);

    //TODO : Les ajouter aux contexte
    res.map((card, index) => {
      currentAdminSellRequest.sellRequests[index]["mkmPriceGuide"] =
        card.data.priceguide;
    });

    setCurrentAdminSellRequest({
      ...currentAdminSellRequest,
    });
  }

  useEffect(() => {
    // console.log("hey avant filtre");
    if (
      currentAdminSellRequest.sellRequests &&
      currentAdminSellRequest.sellRequests.length > 0 &&
      currentAdminSellRequest.idSellRequest !== parseInt(id)
    ) {
      // console.log("hey");
      setCurrentAdminSellRequest([]);
    }
  }, [id]);

  //Getting Selling Settings percent & algo from the shop
  useEffect(() => {
    // console.log("lô avant filtre");
    if (!authenticationInfos?.shop?.shopData?.SellingSettings) {
      // console.log("lô");
      shopAPI
        .getShopSellingSettings(authenticationInfos)
        .then((data) => {
          // console.log(data);
          return data;
        })
        .then((data) =>
          setAuthenticationInfos({
            ...authenticationInfos,
            shop: {
              ...authenticationInfos.shop,
              shopData: {
                ...authenticationInfos.shop.shopData,
                SellingSettings: data.data,
              },
            },
          })
        )
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // console.log("la avant filtre");
    if (
      (currentAdminSellRequest.sellRequests &&
        currentAdminSellRequest.sellRequests.length === 0) ||
      currentAdminSellRequest.idSellRequest !== parseInt(id)
    ) {
      // console.log("la");
      sellRequestAPI
        .findById(id, {
          cancelToken: source.token,
        })
        .then((data) => {
          // console.log("resp from sellRequestAPI", data);
          return data;
        })
        .then((data) => {
          return setCurrentAdminSellRequest({
            id: data.id,
            DateSubmit: data.DateSubmit,
            dateEnvoi: data.dateEnvoi,
            dateRecu: data.dateRecu,
            dateProcessing: data.dateProcessing,
            dateApprovalPending: data.dateApprovalPending,
            dateValidated: data.dateValidated,
            dateCanceled: data.dateCanceled,
            customer: data.client,
            amount: data.amount,
            cardTotalQuantity: data.cardTotalQuantity,
            shop: data.shop,
            idSellRequest: data.id,
            sellRequests: [
              ...data.sellRequestCards.map((card) => {
                return {
                  id: card.cards["@id"].substring(7),
                  idSellRequestCard: card.id,
                  mcmId: card.cards.mcmid,
                  name: card.cards.name,
                  scryfallid: card.cards.scryfallid,
                  hasfoil: 1,
                  hasnonfoil: 1,
                  uuid: card.cards.uuid,
                  foreignData: card.cards.foreignData,
                  condition: card.CardCondition.id.toString(),
                  lang: card.language.id,
                  set: card.cards.edition.name,
                  setId: card.cards.edition.id,
                  price: card.price,
                  quantity: card.cardQuantity,
                  isFoil: card.isFoil,
                  isSigned: card.isSigned,
                  isAltered: card.isAltered,
                  mkmSellPrice: card.mkmSellPrice,
                };
              }),
            ],
          });
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          errorHandlingAPI.check401Unauthorized(err);
        });
    }

    return () => {
      source.cancel("");
      return setCurrentAdminSellRequest([]);
    };
  }, [id]);

  //Refreshing MKM prices on each card of the sell request
  useEffect(() => {
    // console.log("ici avant filtre");
    if (
      currentAdminSellRequest.sellRequests &&
      currentAdminSellRequest.sellRequests.length > 0 &&
      !priceHaveBeenLoaded
    ) {
      // console.log("ici");

      awaitPrices();

      setPriceHaveBeenLoaded(true);
    }
  }, [
    setCurrentAdminSellRequest,
    currentAdminSellRequest,
    id,
    isLoading,
    setIsLoading,
  ]);

  // console.log(currentAdminSellRequest);

  return (
    <>
      <div className="container">
        <h1 className="shopSellRequestTitle">
          <FormattedMessage
            id="app.shop.OneSellRequest.number"
            defaultMessage={`N° `}
          />
          {id}
        </h1>
        <div className="customer-infos">
          <div className="customer-left-part">
            <p>
              <FormattedMessage
                id="app.shop.OneSellRequest.firstName"
                defaultMessage={`First Name : `}
              />
              {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.prenom}
            </p>
            <p>
              <FormattedMessage
                id="app.shop.OneSellRequest.lastName"
                defaultMessage={`Last Name : `}
              />
              {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.nom}
            </p>
            <p>
              <FormattedMessage
                id="app.shop.OneSellRequest.mail"
                defaultMessage={`Mail : `}
              />
              {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.user.email}
            </p>
            <p>
              <FormattedMessage
                id="app.shop.OneSellRequest.telephone"
                defaultMessage={`Tel : `}
              />
              {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.tel}
            </p>
          </div>
          <div className="customer-right-part">
            <p>
              <FormattedMessage
                id="app.shop.OneSellRequest.adress"
                defaultMessage={`Adress : `}
              />
              {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.adress}
            </p>
            <p>
              <FormattedMessage
                id="app.shop.OneSellRequest.postalCode"
                defaultMessage={`Postal Code : `}
              />
              {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.postalCode}
            </p>
            <p>
              <FormattedMessage
                id="app.shop.OneSellRequest.town"
                defaultMessage={`Town : `}
              />
              {isLoading && <OneLineLoader />}
              {!isLoading &&
                currentAdminSellRequest.customer &&
                currentAdminSellRequest.customer.town}
            </p>
          </div>
          {/* PDF Generation */}
          <>
            <p>
              <PDFDownloadLink
                document={
                  <IntlProvider
                    locale={currentLang.locale}
                    messages={currentLang.translationsForUsersLocale}
                  >
                    <SellRequestRecapPDF
                      sellRequest={currentAdminSellRequest}
                      shopData={authenticationInfos.shop}
                    />
                  </IntlProvider>
                }
                fileName={
                  "SellRequest n°" + currentAdminSellRequest.id + ".pdf"
                }
              >
                {({ blob, url, loading, error }) =>
                  loading
                    ? ""
                    : intl.formatMessage({
                        id: "app.shop.OneSellRequest.generatePDF",
                        defaultMessage: "Generate PDF",
                      })
                }
              </PDFDownloadLink>
            </p>
          </>
        </div>
        <div className="sellRequest-infos">
          <p className="sellRequest-status">
            <FormattedMessage
              id="app.shop.OneSellRequest.status"
              defaultMessage={`Status`}
            />
            {isLoading && (
              <span className="margin-top-negative-loader display-block">
                <OneBigLineLoader />
              </span>
            )}
            {!isLoading && (
              <span className="subInfos">
                <StatusCalculator sellRequest={currentAdminSellRequest} />
              </span>
            )}
          </p>
          <p className="sellRequest-lastDate">
            <FormattedMessage
              id="app.shop.OneSellRequest.lastInformation"
              defaultMessage={`Last Information`}
            />
            {isLoading && (
              <span className="margin-top-negative-loader display-block">
                <OneBigLineLoader />
              </span>
            )}
            {!isLoading && (
              <span className="subInfos">
                <LastInformationCalculator
                  sellRequest={currentAdminSellRequest}
                />
              </span>
            )}
          </p>
        </div>
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
                    id="app.shop.OneSellRequest.card"
                    defaultMessage={`Card`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.set"
                    defaultMessage={`Set`}
                  />
                </Th>
                <Th></Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.edit"
                    defaultMessage={`Edit`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.language"
                    defaultMessage={`Language`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.condition"
                    defaultMessage={`Condition`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.foil"
                    defaultMessage={`Foil`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.signed"
                    defaultMessage={`Signed`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.altered"
                    defaultMessage={`Altered`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.quantity"
                    defaultMessage={`Quantity`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.price"
                    defaultMessage={`Price`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.MKMpriceguide"
                    defaultMessage={`MKM Price`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.MKMSellingPrice"
                    defaultMessage={`MKM Selling Price`}
                  />
                  <div className="infoHoverContainer">
                    <FeatherIcon icon="info" />
                    <p className="infoHover">
                      <FormattedMessage
                        id="app.shop.OneSellRequest.warningDiv"
                        description="Greeting to welcome the user to the app"
                        defaultMessage="Automatic Selling Prices are adapted to classic day-to-day
                      cards. For exotic cards like foil Russian, Signed, BGS, or
                      price above {minimum_price_to_check}
                      € it should be checked. These cards are highlighted."
                        values={{
                          minimum_price_to_check:
                            process.env.REACT_APP_MINIMUM_PRICE_TO_CHECK,
                        }}
                      />
                    </p>
                  </div>
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.ajustMKMPrice"
                    defaultMessage={`Change Selling Price`}
                  />
                </Th>
                <Th>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.totaltable"
                    defaultMessage={`Total`}
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody className="cardLineShop">
              {!currentAdminSellRequest.dateValidated &&
                currentAdminSellRequest.dateCanceled === null &&
                currentAdminSellRequest.sellRequests &&
                currentAdminSellRequest.sellRequests.length > 0 &&
                currentAdminSellRequest.sellRequests.map((card, index) => {
                  return (
                    <CardLineShop
                      key={
                        "" +
                        card.id +
                        card.condition +
                        card.price +
                        card.idSellRequestCard
                      }
                      card={card}
                      indexCard={index}
                    />
                  );
                })}
              {(currentAdminSellRequest.dateValidated !== null ||
                currentAdminSellRequest.dateCanceled !== null) &&
                currentAdminSellRequest.sellRequests.map((card, index) => {
                  return (
                    <CardLineShopStuck
                      key={card.id}
                      card={card}
                      indexCard={index}
                    />
                  );
                })}
              <tr className="total-line">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.numberOfCards"
                    defaultMessage={`NUMBER OF CARDS`}
                  />
                </td>
                <td>
                  {currentAdminSellRequest.sellRequests &&
                    currentAdminSellRequest.sellRequests.length > 0 &&
                    currentAdminSellRequest.sellRequests.reduce(
                      (total, card) => {
                        return total + card.quantity;
                      },
                      0
                    )}
                </td>
              </tr>
              <tr className="total-line">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <FormattedMessage
                    id="app.shop.OneSellRequest.total"
                    defaultMessage={`TOTAL`}
                  />
                </td>
                <td>
                  {currentAdminSellRequest.sellRequests &&
                    currentAdminSellRequest.sellRequests.length > 0 &&
                    priceUpdateAPI.smoothFloatKeepEntireComplete(
                      currentAdminSellRequest.sellRequests.reduce(
                        (total, card) => {
                          return total + card.price * card.quantity;
                        },
                        0
                      )
                    )}
                </td>
              </tr>
            </Tbody>
          </Table>
        )}

        <ShopSellRequestStatusValidator />
      </div>
    </>
  );
};

export default ShopAdminOneSellRequest;
