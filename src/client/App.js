import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./app.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Trainer from "./screens/Trainer";
import Login from "./screens/Login";
import Meeting from "./screens/Meeting";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/trainer">
            <Trainer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Meeting />
          </Route>
        </Switch>
    </Router>
  );
}
