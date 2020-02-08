import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthContext from "./context/authContext";
import SetsContext from "./context/setsContext";
import SellRequestContext from "./context/sellingBasket";
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
import allConditions from "./definitions/conditionsDefinition";
import allLanguages from "./definitions/languagesDefinition";

function App() {
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
  }, []);

  // STATE Creating the Authentication state
  const [authenticationInfos, setAuthenticationInfos] = useState(
    AuthAPI.userInfos()
  );

  // STATE Creating the AllSets state
  const [allSets, setAllSets] = useState([]);

  // STATE Creating the Generic Cards Info State
  const [genericCardsInfos, setGenericCardsInfos] = useState({
    lang: allLanguages.allLanguages,
    conditions: allConditions.allConditions
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

  // STATE Creating the Sell Request Basket state
  const [currentBasket, setCurrentBasket] = useState([]);

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

  useEffect(() => {
    console.log("App is loading one time");
  });

  return (
    <div className="App">
      <AuthContext.Provider value={contextValue}>
        <SellRequestContext.Provider value={contextBasket}>
          <SetsContext.Provider value={contextAllSets}>
            <GenericContext.Provider value={genericCardsInfos}>
              <Router>
                <NavbarWithRouter />
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
                  <Route path="/login" component={LoginPage} />} />
                  <Route path="/register" component={RegisterPage} />
                  } />
                  <Route
                    path="/my_selling_basket"
                    component={MySellingBasket}
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
                </Switch>
              </Router>
            </GenericContext.Provider>
          </SetsContext.Provider>
        </SellRequestContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
