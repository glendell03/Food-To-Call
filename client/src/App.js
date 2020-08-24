import React, { useState, useEffect } from "react";
import "./assets/scss/app.scss";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import UserContext from "./context/UserContext";
import axios from "axios";

import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import Account from "./components/pages/Account";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const API_URL = "http://localhost:5000";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const isValid = await axios.post(API_URL + "/users/isValid", null, {
        headers: { "x-auth-token": token },
      });
      if (isValid.data) {
        const user = await axios.get(API_URL + "/users/me", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: user.data,
        });
      }
    };

    isLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />

        <Switch>
          <PublicRoute exact path="/" component={Home} restricted={false} />
          <PublicRoute
            exact
            path="/login"
            component={Login}
            restricted={true}
          />
          <PublicRoute
            exact
            path="/register"
            component={Register}
            restricted={true}
          />
          <PrivateRoute exact path="/users/me" component={Account} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
