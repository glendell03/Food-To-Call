import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("auth-token") && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
