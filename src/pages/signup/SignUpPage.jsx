import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';
import api from '../../services/api.js';
import qs from 'qs';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  // Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared utilities
import validators from 'common/validators';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

validate.validators.checked = validators.checked;

// Service methods
const signUp = async (data) => {
  /**
   * user type
   * 0: normal
   * 1: admin
   */
  return await api.post('/users', qs.stringify(data));

  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(true);
  //   }, 1500);
  // });
};

class SignUpPage extends Component {
  state = {
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
      // policy: false
    },
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      repassword: false,
      // policy: null
    },
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      repassword: null,
      // policy: null
    },
    isValid: false,
    isLoading: false,
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

  handleSignUp = async () => {
    try {
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

      await signUp({
        type: 0,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      });

      history.push('/login');

    } catch (error) {
      const { message } = error.response.data;
      // const { statusCode, message } = error.response.data;
      // switch (statusCode) {
      //   case 409: 
      //     // 409: already exists
      //     //console.error(`singup error> ${message}`);
      //     break;

      //   default:
      // }

      this.setState({
        isLoading: false,
        serviceError: error,
        submitError: message
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showFirstNameError =
      touched.firstName && errors.firstName ? errors.firstName[0] : false;
    const showLastNameError =
      touched.lastName && errors.lastName ? errors.lastName[0] : false;
    const showEmailError =
      touched.email && errors.email ? errors.email[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showRePasswordError =
      touched.repassword && errors.repassword
        ? errors.repassword[0]
        : false;
    // const showPolicyError =
    //   touched.policy && errors.policy ? errors.policy[0] : false;

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
                    Create new account
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Create a new account to get weather notifications and recommendations
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="First name"
                      name="firstName"
                      onChange={event =>
                        this.handleFieldChange('firstName', event.target.value)
                      }
                      value={values.firstName}
                      variant="outlined"
                    />
                    {showFirstNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.firstName[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Last name"
                      onChange={event =>
                        this.handleFieldChange('lastName', event.target.value)
                      }
                      value={values.lastName}
                      variant="outlined"
                    />
                    {showLastNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.lastName[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
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
                    <TextField
                      className={classes.textField}
                      label="Re-password"
                      onChange={event =>
                        this.handleFieldChange('repassword', event.target.value)
                      }
                      type="password"
                      value={values.repassword}
                      variant="outlined"
                    />
                    {showRePasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.repassword[0]}
                      </Typography>
                    )}
                    {/* <div className={classes.policy}>
                      <Checkbox
                        checked={values.policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() =>
                          this.handleFieldChange('policy', !values.policy)
                        }
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1"
                      >
                        I have read the &nbsp;
                        <Link
                          className={classes.policyUrl}
                          to="#"
                        >
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                    {showPolicyError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.policy[0]}
                      </Typography>
                    )} */}
                  </div>
                  {submitError && (
                    <Typography
                      className={classes.submitError}
                      variant="body2"
                    >
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignUp}
                      size="large"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  )}
                  <Typography
                    className={classes.signIn}
                    variant="body1"
                  >
                    Have an account?{' '}
                    <Link
                      className={classes.signInUrl}
                      to="/login"
                    >
                      Sign In
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

SignUpPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignUpPage);
