import React, { useState, useEffect, useCallback } from "react";

import "./App.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SellingBasketAPI from "./services/sellingBasketAPI";
import AuthAPI from "./services/authAPI";
import genericCardCharacteristicsAPI from "./services/genericCardCharacteristicsAPI";

import AuthContext from "./context/authContext";
import SetsContext from "./context/setsContext";
import SellingBasketContext from "./context/sellingBasket";
import SellRequestContext from "./context/adminSellRequestContext";
import GenericContext from "./context/genericCardInfosContext";
import CanSubmitContext from "./context/canSubmitSellRequestContext";
import PriceBufferContext from "./context/priceBufferContext";
import isResponsiveMenuDisplayedContext from "./context/menuDisplayedContext";
import cardsOneSetContext from "./context/cardsOneSetContext";
import BlackDivModal from "./context/blackDivModalContext";
import CardDisplayOnPageContext from "./context/cardDisplayOnPageContext";
import MKMModalContext from "./context/mkmModalConnectionContext";
import shopPublicInfoContext from "./context/publicShopInfoContext";
import UserPreferenceContext from "./context/userPreferenceContext";
import LoginRenewOrLogOutContext from "./context/logAutoRenewOrLogout";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoggedRoute from "./components/LoggedRoute";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import myAccount from "./pages/MyAccount";
import mySellRequests from "./pages/AllMySellRequests";
import OneSet from "./pages/OneSet";
import MySellingBasket from "./pages/MySellingBasket";
import RegisterPage from "./pages/RegisterPage";
import OneSellRequest from "./pages/OneSellRequest";
import ShopNavbar from "./components/shop/ShopNavBar";
import LoggedShopRouteComponent from "./components/LoggedShopRouteComponent";
import LoggedShopRouteRender from "./components/LoggedShopRouteRender";
import ShopAdminHome from "./pages/shopAdmin/ShopAdminHome";
import ShopAdminAllSellRequests from "./pages/shopAdmin/ShopAdminAllSellRequest";
import ShopAdminAllCustomers from "./pages/shopAdmin/ShopAdminAllCustomers";
import ShopAdminCards from "./pages/shopAdmin/ShopAdminCards";
import ShopAdminCustomer from "./pages/shopAdmin/ShopAdminCustomer";
import ShopAdminOneSellRequest from "./pages/shopAdmin/ShopAdminOneSellRequest";
import ShopAdminSettings from "./pages/shopAdmin/ShopAdminSettings";
import Footer from "./components/Footer";
import ShopAdminOneCard from "./pages/shopAdmin/ShopAdminOneCard";
import CardPage from "./pages/CardPage";
import MyShopAccount from "./pages/shopAdmin/MyShopAccount";
import BlackDiv from "./components/BlackDiv";
import CardPlainPage from "./components/CardPlainPage";
import BurgerMenuShop from "./components/shop/BurgerMenuShop";
import BurgerMenuCustomerComponents from "./components/BurgerMenuCustomerComponents";
import MKMConnectModal from "./components/MKMConnectModal";
import shopAPI from "./services/shopAPI";
import BuyingClauses from "./pages/BuyingClauses";
import config from "./services/config";
import authAPI from "./services/authAPI";
import Settings from "./pages/Settings";
import LoggedRouteRender from "./components/LoggedRouteRender";

//Really Useful library to check all rerenders made on ALL components (you can setup it to check just one)
// if (process.env.NODE_ENV === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     include: [/.*/]
//   });
// }

function App() {
  document.title = config.shopName;

  // STATE Creating the Authentication state
  const [authenticationInfos, setAuthenticationInfos] = useState(
    AuthAPI.userInfos()
  );

  //Checking is the JWT token is still good, if yes, Keep it in Axios + Launch JWT Renew setTimeout
  //If not, log out
  useEffect(() => {
    const didLogBack = AuthAPI.setup();

    if (!didLogBack) {
      //Log out if token is not up to date
      setAuthenticationInfos({
        ...authenticationInfos,
        isAuthenticated: false,
        user: { ...authenticationInfos.user, roles: [] },
      });
    } else {
      //Renew JWT token + setTimeout
      renewJWTToken();
    }
  }, []);

  //APP INITIALIZATION USE EFFECT
  useEffect(() => {
    //Load all the sets on App first Load

    const allLangs = genericCardCharacteristicsAPI.getAllLang();
    const allConditions = genericCardCharacteristicsAPI.getAllConditions();
    const publicShopInfos = shopAPI.getPublicInfos();
    Promise.all([allLangs, allConditions, publicShopInfos]).then(
      ([allLangs, allConditions, publicShopInfos]) => {
        setLangDefinition(allLangs);
        setConditionDefinition(allConditions);
        setShopInfos(publicShopInfos);
      }
    );
    //Get the optional saved Selling Basket saved in Localstorage
    const eventuallySavedBasket = SellingBasketAPI.getSaved();
    if (eventuallySavedBasket !== null) {
      setCurrentBasket(eventuallySavedBasket);
    }
  }, []);

  // STATE Creating the AllSets state
  const [allSets, setAllSets] = useState([]);

  // STATE Creating the langage definition state
  const [langDefinition, setLangDefinition] = useState({});

  // STATE Creating the conditions definition state
  const [conditionDefinition, setConditionDefinition] = useState({});

  // STATE Storing Shop Public Infos
  const [shopInfos, setShopInfos] = useState({});

  // STATE Creating the Sell Request Basket state
  const [currentBasket, setCurrentBasket] = useState([]);

  //STATE Creating the CanSubmit Authorization
  const [errorList, setErrorList] = useState([]);

  //STATE Creating the Admin Sell Request Context
  const [currentAdminSellRequest, setCurrentAdminSellRequest] = useState({
    sellRequests: [],
  });

  //STATE - Price Buffer Update State
  const [allPricesBuffer, setAllPricesBuffer] = useState([]);

  //STATE - Check if responsive Menu is displayed
  const [isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed] = useState(
    "deactivated"
  );

  //STATE - Cards Context in One Set
  const [cardsContext, setCardsContext] = useState({});

  //STATE - is Plain Page Black Div Displayed ?
  const [isBlackDivModalDisplayed, setIsBlackDivModalDisplayed] = useState(
    "deactivated"
  );

  //STATE - is MKM Connection Modal Displayed ?
  const [isMKMModalDisplayed, setIsMKMModalDisplayed] = useState("deactivated");

  //STATE - Is a card currently displayed on plain page, and with which information ?
  const [cardDisplayInformation, setCardDisplayInformation] = useState({
    cardPictureUrl: null,
    isDisplayed: false,
  });

  //STATE - Display preferences
  //Default : Local Storage
  const [userPreferences, setUserPreferences] = useState(
    getUserPreferenceCardsSetLang
  );

  //STATE - Auto Renew LogIn or Auto Log Out
  const [timers, setTimers] = useState({ autoRenew: "", autoLogOut: "" });

  // CONTEXT CREATION Creating All Sets value for context
  const contextAllSets = {
    allSets: allSets,
    setAllSets: setAllSets,
  };

  // CONTEXT CREATION Passing Authentication state in Context
  const contextValue = {
    authenticationInfos: authenticationInfos,
    setAuthenticationInfos: setAuthenticationInfos,
  };

  //CONTEXT CREATION Passing Lang and condition definition
  const contextDefinition = {
    lang: langDefinition,
    conditions: conditionDefinition,
  };

  //CONTEXT CREATION Passing Can Submit Info
  const contextSubmit = {
    errorList: errorList,
    setErrorList: setErrorList,
  };

  //CONTEXT CREATION Passing Admin Sell Request
  const contextAdminSellRequest = {
    currentAdminSellRequest: currentAdminSellRequest,
    setCurrentAdminSellRequest: setCurrentAdminSellRequest,
  };

  //CONTEXT CREATION - PRICE BUFFER
  const contextPriceBuffer = {
    allPricesBuffer: allPricesBuffer,
    setAllPricesBuffer: setAllPricesBuffer,
  };

  //CONTEXT CREATION - Is Responsive Menu Displayed
  const contextResponsiveMenuDisplayed = {
    isResponsiveMenuDisplayed: isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed: setIsResponsiveMenuDisplayed,
  };

  //CONTEXT CREATION - Cards displayed in OneSet Page
  const contextCardsOneSet = {
    cardsContext: cardsContext,
    setCardsContext: setCardsContext,
  };

  //CONTEXT CREATION - Cards displayed in OneSet Page
  const contextShopPublicInfos = {
    shopInfos: shopInfos,
    setShopInfos: setShopInfos,
  };

  // Each time the currentBasket (which stores what we want to sell) is updated, we save it in Local storage.
  useEffect(() => {
    SellingBasketAPI.save(currentBasket);
  }, [currentBasket]);

  // Passing Basket state in Context
  const contextBasket = {
    currentBasket: currentBasket,
    setCurrentBasket: setCurrentBasket,
  };

  // CONTEXT - Black Div Modal Activation
  const contextBlackDiv = {
    isBlackDivModalDisplayed: isBlackDivModalDisplayed,
    setIsBlackDivModalDisplayed: setIsBlackDivModalDisplayed,
  };

  //CONTEXT - Card displayed Information and status
  const contextCardDisplayed = {
    cardDisplayInformation: cardDisplayInformation,
    setCardDisplayInformation: setCardDisplayInformation,
  };

  //CONTEXT - MKM Connection Modal
  const contextMKMConnectionModal = {
    isMKMModalDisplayed: isMKMModalDisplayed,
    setIsMKMModalDisplayed: setIsMKMModalDisplayed,
  };

  //CONTEXT - User Preferences
  const ContentUserPreferences = {
    userPreferences: userPreferences,
    setUserPreferences: setUserPreferences,
  };

  //CONTEXT - Auto login/LogOut
  const ContextloginLogOut = {
    timers: timers,
    setTimers: setTimers,
  };

  function getUserPreferenceCardsSetLang() {
    const savedUserPreferenceCardsSetsLang = JSON.parse(
      window.localStorage.getItem("cardsSetLang")
    );
    if (savedUserPreferenceCardsSetsLang) {
      return savedUserPreferenceCardsSetsLang;
    } else {
      return { cardsSetLang: config.baseLang };
    }
  }

  const eraseAuthContext = () => {
    setAuthenticationInfos({
      ...authenticationInfos,
      isAuthenticated: false,
      user: { ...authenticationInfos.user, roles: [] },
    });
    authAPI.logout();
  };

  function throttle(callback, wait, immediate = false) {
    // console.log("throttling");
    let timeout = null;
    let initialCall = true;

    return function () {
      const callNow = immediate && initialCall;
      const next = () => {
        callback.apply(this, arguments);
        timeout = null;
      };

      if (callNow) {
        initialCall = false;
        next();
      }

      if (!timeout) {
        timeout = setTimeout(next, wait);
      }
    };
  }

  const restartLogOutCountDown = () => {
    clearTimeout(timers.autoLogOut);
    // console.log("actually restarting timer");
    setTimers({
      ...timers,
      autoLogOut: setTimeout(eraseAuthContext, config.TIME_TO_LOG_OUT),
    });
  };

  /*
   * We keep track of the timer reference through renders thanks to useCallback
   * https://medium.com/@rajeshnaroth/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
   * See the answer with useCallback exemple
   */
  const delayedQuery = useCallback(
    throttle(() => restartLogOutCountDown(), config.TIME_THROTTLE),
    []
  );

  const renewJWTToken = () => {
    if (authenticationInfos.isAuthenticated) {
      AuthAPI.refreshTokenAndInfos(authenticationInfos.refresh_token)
        .then((data) => {
          //TO DO Transform data to make it app friendly
          // console.log(data);
          return authAPI.transformAPIdataIntoAppData(data.data);
        })
        .then((data) => setAuthenticationInfos(data));

      setTimers({
        ...timers,
        autoRenew: setTimeout(renewJWTToken, config.TIME_JWT_RENEW),
      });
    } else {
      return;
    }
  };

  const NavbarWithRouter = withRouter(Navbar);
  const ShopNavbarWithRouter = withRouter(ShopNavbar);

  //VERY IMPORTANT Function to add cards to Selling Basket.
  //We put it in App component because it need the use of hooks.
  const handleAddSellingBasket = (currentBasket, card) => {
    // console.log(card);
    // console.log(currentBasket);
    //If the selling basket is empty, just add the new card.
    if (currentBasket.length === 0) {
      setCurrentBasket([card]);
    }
    //If there are cards, we parse each of them and check which are in.
    //Here we just check and update quantity
    for (var i = 0; i < currentBasket.length; i++) {
      if (
        currentBasket[i].cardName === card.cardName &&
        currentBasket[i].set === card.set &&
        currentBasket[i].price === card.price &&
        currentBasket[i].condition === card.condition &&
        currentBasket[i].lang === card.lang &&
        currentBasket[i].isFoil === card.isFoil &&
        currentBasket[i].uuid === card.uuid &&
        currentBasket[i].isSigned === card.isSigned
      ) {
        var updatedCard = currentBasket[i];
        //updating quantities in the basket with destructuration (to stay tuned with async updates)
        updatedCard = {
          ...updatedCard,
          quantity: card.quantity + updatedCard.quantity,
        };

        // setCurrentbasket by adding quantity of the card currently added to the selling basket
        // Here we update the new card OBJECT into the selling basket
        setCurrentBasket(
          currentBasket.map((card) => {
            return card.cardName === updatedCard.cardName &&
              card.set === updatedCard.set &&
              card.price === updatedCard.price &&
              card.condition === updatedCard.condition &&
              card.lang === updatedCard.lang &&
              card.isFoil === updatedCard.isFoil &&
              card.uuid === updatedCard.uuid &&
              card.isSigned === updatedCard.isSigned
              ? { ...updatedCard }
              : card;
          })
        );

        break;
      } else {
        setCurrentBasket([...currentBasket, card]);
      }
    }
  };

  //This fonction should be rewritten to get O LOG N space time & complexity
  // Currenlty it is N²
  //To do this, get all the relevant information and hash them into ONE integer. Then sort this array following that integer.
  //Then use algoexpert.io
  const checkForDuplicates = (currentBasket) => {
    var areThereDuplicate = false;
    var indexItem1;
    var indexItem2;
    for (var i = 0; i < currentBasket.length - 1; i++) {
      for (var j = i + 1; j < currentBasket.length; j++) {
        if (
          currentBasket[i].name === currentBasket[j].name &&
          currentBasket[i].set === currentBasket[j].set &&
          currentBasket[i].price === currentBasket[j].price &&
          currentBasket[i].condition === currentBasket[j].condition &&
          currentBasket[i].lang === currentBasket[j].lang &&
          currentBasket[i].isFoil === currentBasket[j].isFoil &&
          currentBasket[i].uuid === currentBasket[j].uuid &&
          currentBasket[i].isSigned === currentBasket[j].isSigned
        ) {
          areThereDuplicate = true;
          indexItem1 = i;
          indexItem2 = j;
        }
      }
    }
    return [areThereDuplicate, indexItem1, indexItem2];
  };

  return (
    <div
      className="App"
      onMouseMove={() => delayedQuery()}
      onTouchMove={() => delayedQuery()}
    >
      <AuthContext.Provider value={contextValue}>
        <SellingBasketContext.Provider value={contextBasket}>
          <SetsContext.Provider value={contextAllSets}>
            <GenericContext.Provider value={contextDefinition}>
              <SellRequestContext.Provider value={contextAdminSellRequest}>
                <BlackDivModal.Provider value={contextBlackDiv}>
                  <shopPublicInfoContext.Provider
                    value={contextShopPublicInfos}
                  >
                    <CardDisplayOnPageContext.Provider
                      value={contextCardDisplayed}
                    >
                      <UserPreferenceContext.Provider
                        value={ContentUserPreferences}
                      >
                        <MKMModalContext.Provider
                          value={contextMKMConnectionModal}
                        >
                          <Router>
                            <isResponsiveMenuDisplayedContext.Provider
                              value={contextResponsiveMenuDisplayed}
                            >
                              {/* Absolute positioned components */}
                              {isBlackDivModalDisplayed === "activated" && (
                                <BlackDiv />
                              )}

                              {cardDisplayInformation.isDisplayed && (
                                <CardPlainPage />
                              )}

                              {isMKMModalDisplayed === "activated" && (
                                <MKMConnectModal />
                              )}

                              {/* CHOOSING WHICH BURGER MENU DISPLAY */}
                              {/* DEPENDING ON IF SHOP OR NOT*/}
                              {isResponsiveMenuDisplayed === "activated" &&
                                !authenticationInfos.user.roles.includes(
                                  "ROLE_SHOP"
                                ) && <BurgerMenuCustomerComponents />}

                              {isResponsiveMenuDisplayed === "activated" &&
                                authenticationInfos.user.roles.includes(
                                  "ROLE_SHOP"
                                ) && <BurgerMenuShop />}

                              {/* CHOOSING WHICH NAVBAR DISPLAY */}
                              {/* DEPENDING ON IF SHOP OR NOT*/}

                              {authenticationInfos.user.roles &&
                              authenticationInfos.user.roles.includes(
                                "ROLE_SHOP"
                              ) ? (
                                <ShopNavbarWithRouter />
                              ) : (
                                <NavbarWithRouter />
                              )}
                            </isResponsiveMenuDisplayedContext.Provider>
                            <ToastContainer
                              autoClose={3000}
                              position="bottom-left"
                              hideProgressBar={true}
                            />
                            <Footer />
                            <Switch>
                              <Route
                                path="/"
                                exact
                                render={(props) => (
                                  <Homepage
                                    handleAddSellingBasket={
                                      handleAddSellingBasket
                                    }
                                  />
                                )}
                              />

                              <Route
                                path="/sets/:id"
                                render={({ match }) => (
                                  <cardsOneSetContext.Provider
                                    value={contextCardsOneSet}
                                  >
                                    <OneSet
                                      handleAddSellingBasket={
                                        handleAddSellingBasket
                                      }
                                      match={match}
                                    />
                                  </cardsOneSetContext.Provider>
                                )}
                              />

                              <Route
                                path="/login"
                                render={({ match, history }) => (
                                  <LoginRenewOrLogOutContext.Provider
                                    value={ContextloginLogOut}
                                  >
                                    <LoginPage
                                      match={match}
                                      history={history}
                                      eraseAuthContext={eraseAuthContext}
                                      renewJWTToken={renewJWTToken}
                                    />
                                  </LoginRenewOrLogOutContext.Provider>
                                )}
                              />

                              <Route
                                path="/card/:cardName"
                                render={({ match, history }) => (
                                  <CardPage
                                    match={match}
                                    history={history}
                                    handleAddSellingBasket={
                                      handleAddSellingBasket
                                    }
                                  />
                                )}
                              />

                              <Route
                                path="/register"
                                component={RegisterPage}
                              />
                              <Route
                                path="/buyingClauses"
                                component={BuyingClauses}
                              />

                              <Route
                                path="/my_selling_basket"
                                render={({ match, history }) => (
                                  <CanSubmitContext.Provider
                                    value={contextSubmit}
                                  >
                                    <MySellingBasket
                                      checkForDuplicates={checkForDuplicates}
                                      match={match}
                                      history={history}
                                    />
                                  </CanSubmitContext.Provider>
                                )}
                              />
                              <LoggedRoute
                                path="/my_sell_requests/:id"
                                component={OneSellRequest}
                              />
                              <LoggedRoute
                                path="/my_sell_requests"
                                component={mySellRequests}
                              />
                              <LoggedRouteRender
                                path="/my_account"
                                component={myAccount}
                              />
                              <LoggedRoute
                                path="/settings"
                                component={Settings}
                              />
                              {/* Admin Part */}

                              <LoggedShopRouteRender
                                path="/shopadmin/sell_requests/:id"
                                component={ShopAdminOneSellRequest}
                              />
                              <LoggedShopRouteRender
                                path="/shopadmin/sell_requests"
                                component={ShopAdminAllSellRequests}
                              />
                              <LoggedShopRouteRender
                                path="/shopadmin/customers/:id"
                                component={ShopAdminCustomer}
                              />
                              <LoggedShopRouteRender
                                path="/shopadmin/customers"
                                component={ShopAdminAllCustomers}
                              />
                              <LoggedShopRouteRender
                                path="/shopadmin/settings"
                                component={ShopAdminSettings}
                              />
                              <LoggedShopRouteRender
                                path="/shopadmin/shopInfos"
                                component={MyShopAccount}
                              />

                              <PriceBufferContext.Provider
                                value={contextPriceBuffer}
                              >
                                <LoggedShopRouteRender
                                  path="/shopadmin/card/:name"
                                  component={ShopAdminOneCard}
                                />
                              </PriceBufferContext.Provider>

                              <LoggedShopRouteComponent
                                path="/shopadmin"
                                component={ShopAdminHome}
                              />
                            </Switch>
                          </Router>
                        </MKMModalContext.Provider>
                      </UserPreferenceContext.Provider>
                    </CardDisplayOnPageContext.Provider>
                  </shopPublicInfoContext.Provider>
                </BlackDivModal.Provider>
              </SellRequestContext.Provider>
            </GenericContext.Provider>
          </SetsContext.Provider>
        </SellingBasketContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
