import React, { useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import AuthContext from "./context/authContext";
import SellRequestContext from "./context/sellingBasket";
import AuthAPI from "./services/authAPI";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import myAccount from "./pages/MyAccount";
import mySellRequests from "./pages/AllMySellRequests";
import OneSet from "./pages/OneSet";
import MySellingBasket from "./pages/MySellingBasket";

function App() {
  //Creating the Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  // Passing Authentication state in Context
  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  };

  //Creating the Sell Request Basket state
  const [currentBasket, setCurrentBasket] = useState([{ lol: "lol" }]);

  // Passing Authentication state in Context
  const contextBasket = {
    currentBasket: currentBasket,
    setCurrentBasket: setCurrentBasket
  };

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <div className="App">
      <AuthContext.Provider value={contextValue}>
        <SellRequestContext.Provider value={contextBasket}>
          <Router>
            <NavbarWithRouter />
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/my_sell_requests" component={mySellRequests} />
              <Route path="/sets/:id" component={OneSet} />
              <Route path="/login" component={LoginPage} />} />
              <PrivateRoute
                path="/my_selling_basket"
                component={MySellingBasket}
              />
              <PrivateRoute path="/my_account" component={myAccount} />
            </Switch>
          </Router>
        </SellRequestContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
