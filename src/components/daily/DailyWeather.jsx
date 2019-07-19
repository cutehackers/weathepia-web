import React, { Component } from 'react';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import DailyWeatherTable from './table/DailyWeatherTable';
import styles from './styles';


class DailyWeather extends Component {
  render() {
    const { daily } = this.props;

    return (
      <DailyWeatherTable 
        models={daily}
      />
    );
  }
}

DailyWeather.propTypes = {
  classes: PropTypes.object.isRequired,
  daily: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(DailyWeather);
