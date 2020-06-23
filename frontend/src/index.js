import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/auth/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/auth/Register.js";
import Test from "views/auth/test.js";

import CompanyRegister from "views/auth/CompanyRegister.js";
import ListCompanyPrograms from "views/programs/company/list";
import List from "views/programs/ListAllPrograms";  
import SelectedProgram from "views/SelectedProgram/SelectedProgram.js";
import CompanySelectedProgram from "views/SelectedProgram/CompanySelectedProgram.js";
import UserMessages from "views/messages/UserMessages.js";
import CompanyMessages from "views/messages/CompanyMessages.js";
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
        path="/company-register"
        exact
        render={props => <CompanyRegister {...props} />}
      />
       <Route
        path="/user-messages"
        exact
        render={props => <UserMessages {...props} />}
      />
       <Route
        path="/company-messages"
        exact
        render={props => <CompanyMessages {...props} />}
      />
      <Route
        path="/programs/:id"
        exact
        render={props => <Program {...props} />}
      />
       <Route
        path="/company/:id"
        exact
        render={props => <Company {...props} />}
      />
        <Route
        path="/programs"
        exact
        render={props => <List {...props} />}
      />
      <Route
        path="/company-programs"
        exact
        render={props => <ListCompanyPrograms {...props} />}
      />
      <Route
        path="/selected-programs"
        exact
        render={props => <SelectedProgram {...props} />}
      />

      <Route
        path="/company-selected-programs"
        exact
        render={props => <CompanySelectedProgram {...props} />}
      />

      <Route
        path="/test"
        exact
        render={props => <Test {...props} />}
      />

      
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
