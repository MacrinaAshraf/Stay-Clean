import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Login from "views/auth/Login.js";
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
import Error from "./components/Error"
import ListCompanyOffers from './views/offers/company/listOffers'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        {
          sessionStorage.getItem('is_company') === "true" ?
            <ListCompanyPrograms />
            : <Index />
        }
      </Route>
      <Route
        path="/login"
        exact>
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "false" ?
          <Index />
          : sessionStorage.getItem('is_company') === "true" ?
            <ListCompanyPrograms />
            : <Login />}
      </Route>
      <Route
        path="/register"
        exact>
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "false" ?
          <Index />
          : sessionStorage.getItem('is_company') === "true" ?
            <ListCompanyPrograms />
            : <Register />}
      </Route>
      <Route
        path="/company-register"
        exact>
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "false" ?
          <Index />
          : sessionStorage.getItem('is_company') === "true" ?
            <ListCompanyPrograms />
            : <CompanyRegister />}
      </Route>
      <Route
        path="/user-messages"
        exact>
        {
          localStorage.getItem('token') && sessionStorage.getItem('is_company') === "false" ?
            <UserMessages />
            : sessionStorage.getItem('is_company') === "true" ?
              <CompanyMessages />
              : <Index />
        }
      </Route>
      <Route
        path="/company-messages"
        exact
      >
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "false" ?
          <UserMessages />
          : sessionStorage.getItem('is_company') === "true" ?
            <CompanyMessages />
            : <Index />}
      </Route>
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
        exact>
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "true" ?
          <ListCompanyPrograms />
          :
          <List />}
      </Route>
      {/* render={props => <List {...props} />}
      /> */}
      <Route
        path="/company-programs"
        exact
      >
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "true" ?
          <ListCompanyPrograms />
          :
          <List />
        }
      </Route>
      <Route
        path="/selected-programs"
        exact>
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "false" ?
          <SelectedProgram />
          : sessionStorage.getItem('is_company') === "true" ?
            <CompanySelectedProgram />
            : <Index />}
      </Route>
      <Route
        path="/company-selected-programs"
        exact>
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "false" ?
          <SelectedProgram />
          : sessionStorage.getItem('is_company') === "true" ?
            <CompanySelectedProgram />
            : <Index />}
      </Route>

      <Route
        path="/offer"
        exact>
        {localStorage.getItem('token') && sessionStorage.getItem('is_company') === "true" ?
          <ListCompanyOffers />
          :
          <Index />
        }
      </Route>

      <Route
        path="/error"
        exact
        render={props => <Error {...props} />}
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
