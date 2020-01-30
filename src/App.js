import React, { useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import AuthContext from "./context/authContext";
import AuthAPI from "./services/authAPI";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <div className="App">
        <Navbar />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
