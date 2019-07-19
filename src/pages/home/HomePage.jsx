import React, { Component } from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import { HomePageLayout } from './components';
import { WeatherForecast } from '../../components';

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
    const { classes } = this.props;
    const { isWeatherRequesting, forecast } = this.props;
    const isValidForecast = forecast && !this.isEmpty(forecast);

    return (
      <HomePageLayout title="Weathepia">
        {isWeatherRequesting ? (
          <div className={classes.container}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <div className={classes.contentContainer}>
            {isValidForecast && (
              <Typography
                className={classes.title}
                variant="h3"
              >
                {forecast.daily.city_name}
              </Typography>
            )}
            <WeatherForecast forecast={forecast} />
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
