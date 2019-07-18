import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/signup/SignUpPage';
import LoginPage from './pages/login/LoginPage';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact 
          from="/" 
          to="/home" 
        />
        <Route
          component={HomePage} 
          exact 
          path="/home" 
        />
        <Route
          component={SignUpPage}
          exact
          path="/sign-up"
        />
        <Route
          component={LoginPage}
          exact
          path="/login"
        />
        <Route 
          component={Error} 
        />
      </Switch>
    );
  }
}