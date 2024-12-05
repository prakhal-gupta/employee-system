import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import RouteContext from "./RouteContext";
import Login from "./components/modules/login";
import Error404 from "./crashHandling/Error404";
import Index from "./components/modules/Dashboard";
import EditUser from "./components/modules/user/EditUser";
import {displayMessage} from "./utils/common";
import {ERROR_MSG_TYPE} from "./constants/dataKeys";

const RoutesHome = ({ location }) => {
  const history = useHistory();
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (storedToken) {
      history.push("/dashboard");
    } else if (history.location.pathname !== "/login") {
      history.push("/login");
    }
  }, [storedToken, history]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token || token !== storedToken) {
        setStoredToken(token);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [storedToken]);

  const protectComponent = (Component) => {
    if (!localStorage.getItem("token") && history.location.pathname !== "/login") {
      displayMessage(ERROR_MSG_TYPE, "Unauthorized access");
      return <Redirect to="/login" />;
    } else if (storedToken && storedToken !== localStorage.getItem("token")) {
      return <Error404 />;
    }
    return Component;
  };

  return (
      <RouteContext.Provider value={{ loggedIn: !!storedToken, history, location }}>
        <Switch>
          <Route
              exact
              path={["/", "/dashboard"]}
              render={(route) => protectComponent(<Index {...route} />)}
          />
          <Route exact path="/login" render={(route) => <Login {...route} />} />
          <Route exact path="/user/edit" render={(route) => protectComponent(<EditUser {...route} />)} />
          <Route render={() => <Error404 />} />
        </Switch>
      </RouteContext.Provider>
  );
};

export default RoutesHome;