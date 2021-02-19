import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./privateRoute";
import Trainer from "./screens/Trainer";
import Login from "./screens/Login";
import Meeting from "./screens/Meeting";

export default function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/trainer">
          <Trainer />
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>
        
        <PrivateRoute path="/">
          <Meeting />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
