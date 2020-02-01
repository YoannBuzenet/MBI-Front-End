import React, { useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import AuthContext from "./context/authContext";
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
import myAccount from "./pages/myAccount";
import mySellRequests from "./pages/mySellRequests";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  };

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <div className="App">
      <AuthContext.Provider value={contextValue}>
        <Router>
          <NavbarWithRouter />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <PrivateRoute path="/my_sell_requests" component={mySellRequests} />
            <PrivateRoute path="/my_account" component={myAccount} />
            <Route path="/login" component={LoginPage} />} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
