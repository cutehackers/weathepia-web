/**
 * packages
 * yarn add redux react-redux redux-thunk redux-logger
 * yarn add recompose underscore
 * 
 * yarn add --dev webpack webpack-cli webpack-dev-server html-webpack-plugin
 * yarn add --dev babel-core babel-loader babel-preset-env babel-preset-react
 * 
 * webpack
 * https://itnext.io/front-end-development-with-javascript-using-reactjs-redux-sass-and-webpack-1a2fdd46daba
 */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Routes from './Routes';
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

/**
 * React + Redux login authentication example
 * https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
 * 
 * value         |0px     600px    960px    1280px   1920px
 * key           |xs      sm       md       lg       xl
 * screen width  |--------|--------|--------|--------|-------->
 * range         |   xs   |   sm   |   md   |   lg   |   xl
 */
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
