import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import { HomePageLayout } from './components';
import { WeatherForecast, PlaceGridList } from '../../components';

import styles from './styles';

/**
 * Home page container component
 */
class HomePage extends Component {
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    const { 
      classes,
      isWeatherRequesting, 
      forecast 
    } = this.props;
    const isValidForecast = forecast && !this.isEmpty(forecast);
    const cityName = isValidForecast ? (forecast.hourly.city_name) : null;

    return (
      <HomePageLayout title="Weather">
        {isWeatherRequesting ? (
          <div className={classes.container}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <div className={classes.contentContainer}>
            {isValidForecast && (
              <Typography
                className={classes.cityTitleText}
                variant="h3"
              >
                {cityName}
              </Typography>
            )}
            <WeatherForecast forecast={forecast} />
            {isValidForecast && (
              <Fragment>
                <Typography
                  className={classes.titleText}
                  variant="h3"
                >
                  {'Places'}
                </Typography>
                <PlaceGridList />
              </Fragment>
            )}
            {/* <Fragment>
              <Typography
                className={classes.titleText}
                variant="h3"
              >
                {'Places'}
              </Typography>
              <PlaceGridList />
            </Fragment> */}
          </div>
        )}
      </HomePageLayout>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  forecast: PropTypes.object,
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
