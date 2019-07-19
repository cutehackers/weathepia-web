import React, { Component } from 'react';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import HourlyWeatherTable from './table/HourlyWeatherTable';
import styles from './styles';


class HourlyWeather extends Component {
  render() {
    const { hourly } = this.props;

    return (
      <HourlyWeatherTable 
        models={hourly}
      />
    );
  }
}

HourlyWeather.propTypes = {
  classes: PropTypes.object.isRequired,
  hourly: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(HourlyWeather);
