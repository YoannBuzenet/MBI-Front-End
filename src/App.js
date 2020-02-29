import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthContext from "./context/authContext";
import SetsContext from "./context/setsContext";
import SellingBasketContext from "./context/sellingBasket";
import SellRequestContext from "./context/adminSellRequestContext";
import GenericContext from "./context/genericCardInfosContext";
import AuthAPI from "./services/authAPI";
import SetsAPI from "./services/setsAPI";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import LoggedRoute from "./components/LoggedRoute";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import myAccount from "./pages/MyAccount";
import mySellRequests from "./pages/AllMySellRequests";
import OneSet from "./pages/OneSet";
import MySellingBasket from "./pages/MySellingBasket";
import RegisterPage from "./pages/RegisterPage";
import OneSellRequest from "./pages/OneSellRequest";
import SellingBasketAPI from "./services/sellingBasketAPI";
import genericCardCharacteristicsAPI from "./services/genericCardCharacteristicsAPI";
import CanSubmitContext from "./context/canSubmitSellRequestContext";
import ShopNavbar from "./components/shop/ShopNavBar";
import LoggedShopRoute from "./components/LoggedShopRoute";
import ShopAdminHome from "./pages/shopAdmin/ShopAdminHome";
import ShopAdminAllSellRequests from "./pages/shopAdmin/ShopAdminAllSellRequest";
import ShopAdminAllCustomers from "./pages/shopAdmin/ShopAdminAllCustomers";
import ShopAdminCards from "./pages/shopAdmin/ShopAdminCards";
import authAPI from "./services/authAPI";
import ShopAdminCustomer from "./pages/shopAdmin/ShopAdminCustomer";
import ShopAdminOneSellRequest from "./pages/shopAdmin/ShopAdminOneSellRequest";
import ShopAdminSettings from "./pages/shopAdmin/ShopAdminSettings";
import Footer from "./components/Footer";
import ShopAdminOneCard from "./pages/shopAdmin/ShopAdminOneCard";

//Really Useful library to check all rerenders made on ALL components (you can setup it to check just one)
// if (process.env.NODE_ENV === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     include: [/.*/]
//   });
// }

function App() {
  //Checking is the JWT token is still good, if yes, Keep it on Axios
  const didGetTokenBack = authAPI.setup();

  //APP INITIALIZATION USE EFFECT
  useEffect(() => {
    //Load all the sets on App first Load
    SetsAPI.findAll().then(data => {
      setAllSets(data);
    });

    //Get the optional saved Selling Basket saved in Localstorage
    const eventuallySavedBasket = SellingBasketAPI.getSaved();

    if (eventuallySavedBasket !== null) {
      setCurrentBasket(eventuallySavedBasket);
    }

    //Getting all languages Definition
    genericCardCharacteristicsAPI
      .getAllLang()
      .then(data => setLangDefinition(data));

    //Getting all conditions Definition
    genericCardCharacteristicsAPI
      .getAllConditions()
      .then(data => setConditionDefinition(data));
  }, []);

  // STATE Creating the Authentication state
  const [authenticationInfos, setAuthenticationInfos] = useState(
    AuthAPI.userInfos()
  );

  // STATE Creating the AllSets state
  const [allSets, setAllSets] = useState([]);

  // STATE Creating the langage definition state
  const [langDefinition, setLangDefinition] = useState({});

  // STATE Creating the conditions definition state
  const [conditionDefinition, setConditionDefinition] = useState({});

  // STATE Creating the Sell Request Basket state
  const [currentBasket, setCurrentBasket] = useState([]);

  //STATE Creating the CanSubmit Authorization
  const [errorList, setErrorList] = useState([]);

  //STATE Creating the Admin Sell Request Context
  const [currentAdminSellRequest, setCurrentAdminSellRequest] = useState({
    sellRequests: []
  });

  // CONTEXT CREATION Creating All Sets value for context
  const contextAllSets = {
    allSets: allSets,
    setAllSets: setAllSets
  };

  // CONTEXT CREATION Passing Authentication state in Context
  const contextValue = {
    authenticationInfos: authenticationInfos,
    setAuthenticationInfos: setAuthenticationInfos
  };

  //CONTEXT CREATION Passing Lang and condition definition
  const contextDefinition = {
    lang: langDefinition,
    conditions: conditionDefinition
  };

  //CONTEXT CREATION Passing Can Submit Info
  const contextSubmit = {
    errorList: errorList,
    setErrorList: setErrorList
  };

  //CONTEXT CREATION Passing Admin Sell Request
  const contextAdminSellRequest = {
    currentAdminSellRequest: currentAdminSellRequest,
    setCurrentAdminSellRequest: setCurrentAdminSellRequest
  };

  // Each time the currentBasket (which stores what we want to sell) is updated, we save it in Local storage.
  useEffect(() => {
    SellingBasketAPI.save(currentBasket);
  }, [currentBasket]);

  // Passing Authentication state in Context
  const contextBasket = {
    currentBasket: currentBasket,
    setCurrentBasket: setCurrentBasket
  };

  const NavbarWithRouter = withRouter(Navbar);
  const ShopNavbarWithRouter = withRouter(ShopNavbar);

  //VERY IMPORTANT Function to add cards to Selling Basket.
  //We put it in App component because it need the use of hooks.
  const handleAddSellingBasket = (currentBasket, card) => {
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
        currentBasket[i].uuid === card.uuid
      ) {
        var updatedCard = currentBasket[i];
        //updating quantities in the basket with destructuration (to stay tuned with async updates)
        updatedCard = {
          ...updatedCard,
          quantity: card.quantity + updatedCard.quantity
        };

        // setCurrentbasket by adding quantity of the card currently added to the selling basket
        // Here we update the new card OBJECT into the selling basket
        setCurrentBasket(
          currentBasket.map(card => {
            return card.cardName === updatedCard.cardName &&
              card.set === updatedCard.set &&
              card.price === updatedCard.price &&
              card.condition === updatedCard.condition &&
              card.lang === updatedCard.lang &&
              card.isFoil === updatedCard.isFoil &&
              card.uuid === updatedCard.uuid
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
  const checkForDuplicates = currentBasket => {
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
          currentBasket[i].uuid === currentBasket[j].uuid
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
    <div className="App">
      <AuthContext.Provider value={contextValue}>
        <SellingBasketContext.Provider value={contextBasket}>
          <SetsContext.Provider value={contextAllSets}>
            <GenericContext.Provider value={contextDefinition}>
              <CanSubmitContext.Provider value={contextSubmit}>
                <SellRequestContext.Provider value={contextAdminSellRequest}>
                  <Router>
                    {authenticationInfos.user.roles &&
                    authenticationInfos.user.roles.includes("ROLE_SHOP") ? (
                      <ShopNavbarWithRouter />
                    ) : (
                      <NavbarWithRouter />
                    )}
                    <Footer />
                    <Switch>
                      <Route
                        path="/"
                        exact
                        render={props => (
                          <Homepage
                            handleAddSellingBasket={handleAddSellingBasket}
                          />
                        )}
                      />
                      <Route
                        path="/sets/:id"
                        render={({ match }) => (
                          <OneSet
                            handleAddSellingBasket={handleAddSellingBasket}
                            match={match}
                          />
                        )}
                      />
                      <Route path="/login" component={LoginPage} />
                      } />
                      <Route path="/register" component={RegisterPage} />
                      } />
                      <Route
                        path="/my_selling_basket"
                        render={({ match, history }) => (
                          <MySellingBasket
                            checkForDuplicates={checkForDuplicates}
                            match={match}
                            history={history}
                          />
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
                      <LoggedRoute path="/my_account" component={myAccount} />
                      {/* Admin Part */}
                      <LoggedShopRoute
                        path="/shopadmin/sell_requests/:id"
                        component={ShopAdminOneSellRequest}
                      />
                      <LoggedShopRoute
                        path="/shopadmin/sell_requests"
                        component={ShopAdminAllSellRequests}
                      />
                      <LoggedShopRoute
                        path="/shopadmin/customers/:id"
                        component={ShopAdminCustomer}
                      />
                      <LoggedShopRoute
                        path="/shopadmin/customers"
                        component={ShopAdminAllCustomers}
                      />
                      <LoggedShopRoute
                        path="/shopadmin/cards"
                        component={ShopAdminCards}
                      />
                      <LoggedShopRoute
                        path="/shopadmin/settings"
                        component={ShopAdminSettings}
                      />
                      <LoggedShopRoute
                        path="/shopadmin/card/:name"
                        component={ShopAdminOneCard}
                      />
                      <LoggedShopRoute
                        path="/shopadmin"
                        component={ShopAdminHome}
                      />
                    </Switch>
                  </Router>
                </SellRequestContext.Provider>
              </CanSubmitContext.Provider>
            </GenericContext.Provider>
          </SetsContext.Provider>
        </SellingBasketContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
