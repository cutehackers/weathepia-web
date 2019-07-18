import React, { Component } from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles, CircularProgress } from '@material-ui/core';
import { HomePageLayout } from './components';
import { WeatherForecast } from '../../components';

import styles from './styles';

/**
 * Home page container component
 */
class HomePage extends Component {
  render() {
    const { classes } = this.props;
    const { isWeatherRequesting, forecast } = this.props;

    return (
      <HomePageLayout title="Weathepia">
        {isWeatherRequesting ? (
          <div className={classes.container}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <WeatherForecast forecast={forecast} />
        )}
      </HomePageLayout>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired,
  isWeatherRequesting: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { isWeatherRequesting, forecast } = state.weather;
  return {
    isWeatherRequesting, forecast
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(HomePage);
