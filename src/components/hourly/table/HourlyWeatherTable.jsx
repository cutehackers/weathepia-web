import React, { Component } from 'react';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/styles';
import {
  Grid,
  Typography
} from '@material-ui/core';

import moment from 'moment';
import styles from './styles';


class HourlyWeatherTable extends Component {
  render() {
    const { classes, className, models } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Grid
        className={rootClassName}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {models.data.map(weather => (
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            xs={2}
          >
            <Typography align="center" className={classes.timeText} variant="body1">
              {/* {moment.unix(weather.ts).format(moment.HTML5_FMT.DATETIME_LOCAL)} */}
              {moment.unix(weather.ts).format('hA')}
            </Typography>
            <Typography align="center" className={classes.precipitation} variant="body2">
              {`${weather.pop}%, ${weather.rh}%`}
            </Typography>
            <img
              alt="weather"
              className={classes.avatar}
              src={require(`../../../assets/images/weather/${weather.weather.icon}.png`)}
            />
            <Typography 
              align="center"
              className={classes.temperature} 
              variant="body1"
            >
              {`${weather.temp}`}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  }
}

HourlyWeatherTable.propTypes = {
  classes: PropTypes.object.isRequired,
  models: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(HourlyWeatherTable);
