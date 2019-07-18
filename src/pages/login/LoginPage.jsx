import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// material helpers
import { withStyles } from '@material-ui/core';

// material components
import {
  Grid,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import { login } from '../../redux/actions';

// Shared components
//import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';


/**
 * Login page
 */
class LoginPage extends Component {
  state = {
    values: {
      email: '',
      password: ''
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    submitError: null
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleLogin = () => {
    const { dispatch, history } = this.props;
    const { values } = this.state;

    dispatch(login(values['email'], values['password'], history));
  }

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError
    } = this.state;

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    //const { isLoginRequesting, isAuthenticated } = this.props;
    const { isLoginRequesting } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.content}
            item
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Sign in with your email
                  </Typography>
                  {/* <Button
                    className={classes.facebookButton}
                    color="primary"
                    onClick={this.handleLogin}
                    size="large"
                    variant="contained"
                  >
                    <FacebookIcon className={classes.facebookIcon} />
                    Login with Facebook
                  </Button>
                  <Button
                    className={classes.googleButton}
                    onClick={this.handleLogin}
                    size="large"
                    variant="contained"
                  >
                    <GoogleIcon className={classes.googleIcon} />
                    Login with Google
                  </Button> */}
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
                      type="text"
                      value={values.email}
                      variant="outlined"
                    />
                    {showEmailError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography
                      className={classes.submitError}
                      variant="body2"
                    >
                      {submitError}
                    </Typography>
                  )}
                  {isLoginRequesting ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.loginButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleLogin}
                      size="large"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  )}
                  <Typography
                    className={classes.signUp}
                    variant="body1"
                  >
                    Don't have an account?{' '}
                    <Link
                      className={classes.signUpUrl}
                      to="/sign-up"
                    >
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoginRequesting: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { isLoginRequesting, isAuthenticated } = state.authorization;
  return {
    isLoginRequesting, isAuthenticated
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps)
)(LoginPage);
