import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { 
  withStyles, 
  CircularProgress, 
  Typography,
  IconButton
} from '@material-ui/core';

import { 
  AddCircleOutlined as AddCircleIcon
} from '@material-ui/icons';

import { HomePageLayout } from '../../layout/home';
import { WeatherForecast, PlaceGridList } from '../../components';
import { createWeatherChannel } from '../../redux/actions/channel.actions';

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

  handleAddCityClick = () => {
    let user = JSON.parse(localStorage.getItem('user'));

    console.log(`darby> user: ${JSON.stringify(user)}`);

    const { dispatch, forecast } = this.props;

    const isValidForecast = forecast && !this.isEmpty(forecast);
    if (isValidForecast) {
      dispatch(createWeatherChannel({
        uid: user.data.id,
        city: forecast.hourly.city_name
      }));
    }
  }

  render() {
    const { 
      classes,
      isWeatherRequesting, 
      forecast 
    } = this.props;
    const isValidForecast = forecast && !this.isEmpty(forecast);
    const cityName = isValidForecast ? (forecast.hourly.city_name) : null;

    const { isAuthenticated } = this.props;

    return (
      <HomePageLayout title="Weather">
        {isWeatherRequesting ? (
          <div className={classes.container}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <div className={classes.contentContainer}>
            {isValidForecast && (
              <div className={classes.titleContainer}>
                <Typography
                  className={classes.cityTitleText}
                  variant="h3"
                >
                  {cityName}
                </Typography>
                {isAuthenticated && (
                  <IconButton
                    className={classes.cityAddButton}
                    onClick={this.handleAddCityClick}
                    variant="text"
                  >
                    <AddCircleIcon />
                  </IconButton>
                )}
              </div>
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
          </div>
        )}
      </HomePageLayout>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  forecast: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isWeatherRequesting: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.authorization;
  const { isWeatherRequesting, forecast } = state.weather;
  return {
    isWeatherRequesting, 
    forecast,
    isAuthenticated
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(HomePage);
