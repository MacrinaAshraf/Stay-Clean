import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/users/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/users/Register.js";
import List from "views/programs/list.js";  
import SelectedProgram from "views/SelectedProgram/SelectedProgram.js";
import Messages from "views/examples/Messages.js";
import Program from "views/specificData/Program.js";
import Company from "views/specificData/Company.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      <Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
      />
      <Route 
        path="/login" 
        exact 
        render={props => <Login {...props} />} 
      />
      <Route
        path="/profile-page"
        exact
        render={props => <Profile {...props} />}
      />
      <Route
        path="/register"
        exact
        render={props => <Register {...props} />}
      />
       <Route
        path="/messages-page"
        exact
        render={props => <Messages {...props} />}
      />
      <Route
        path="/program/:id"
        exact
        render={props => <Program {...props} />}
      />
       <Route
        path="/company/:id"
        exact
        render={props => <Company {...props} />}
      />
        <Route
        path="/list-programs-page"
        exact
        render={props => <List {...props} />}
      />
      <Route
        path="/selected-programs"
        exact
        render={props => <SelectedProgram {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
