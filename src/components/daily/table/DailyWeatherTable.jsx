import React, { Component } from 'react';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';

import moment from 'moment';
import styles from './styles';


class DailyWeatherTable extends Component {
  render() {
    const { classes, models } = this.props;

    return (
      <Table>
        <TableBody>
          {models.data
            .map(weather => (
              <TableRow 
                className={classes.tableRow} 
                hover
                key={weather.ts}
              >
                <TableCell 
                  className={classes.tableCell}
                >
                  <Typography 
                    className={classes.nameText}
                    variant="body1"
                  >
                    {/* {moment.unix(weather.ts).format(moment.HTML5_FMT.DATETIME_LOCAL)} */}
                    {moment.unix(weather.ts).format('dddd')}
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <img
                    alt="weather"
                    className={classes.avatar}
                    src={require(`../../../assets/images/weather/${weather.weather.icon}.png`)}
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>{`${weather.pop}%, ${weather.rh}%`}</TableCell>
                <TableCell className={classes.tableCell}>{weather.max_temp}</TableCell>
                <TableCell className={classes.tableCell}>{weather.min_temp}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  }
}

DailyWeatherTable.propTypes = {
  classes: PropTypes.object.isRequired,
  models: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(DailyWeatherTable);
