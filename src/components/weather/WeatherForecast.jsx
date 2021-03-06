import React, { Component, Fragment } from 'react';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { withStyles, Grid, Divider } from '@material-ui/core';

import { Portlet, PortletContent } from 'components';
import HourlyWeather from '../hourly/HourlyWeather';
import DailyWeather from '../daily/DailyWeather';
import styles from './styles';

/**
 * Weather forecast componenet which display hourly, daily forecast data.
 */
class WeatherForecast extends Component {
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    const { classes, className, forecast } = this.props;
    const rootClassName = classNames(classes.root, className);
    const isValidForecast = forecast && !this.isEmpty(forecast);

    return (
      <Fragment>
        {isValidForecast ? (
          <Portlet className={rootClassName}>
            <PortletContent noPadding>
              <PerfectScrollbar>
                <HourlyWeather
                  hourly={forecast.hourly}
                />
                <Divider />
                <DailyWeather 
                  daily={forecast.daily}
                />
              </PerfectScrollbar>
            </PortletContent>
          </Portlet>
        ) : (
          <div className={classes.container}>
            <Grid
              item
              className={classes.emptyWeatherView}
              xs={5}
              sm={3}
              md={3}
              lg={2}
              xl={2}>
              <img
                alt="empty weather data"
                src="/images/empty_weather_forecast.svg"
              />
            </Grid>
          </div>
        )}
      </Fragment>
    );
  }
}

WeatherForecast.propTypes = {
  classes: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(WeatherForecast);
