import React from "react";
import { Route, Redirect} from "react-router-dom";

import { useSelector } from "react-redux";

export default function PrivateRoute({ children, ...rest }) {
  const tokens = useSelector((state) => state.auth.tokens);
  const isAuthenticated = !!tokens.access && new Date() < new Date(tokens.access.expires);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
