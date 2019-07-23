import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles, IconButton, Grid } from '@material-ui/core';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { 
  LocationCityOutlined as LocationCityIcon,
  PlaylistAdd as PlaylistAddIcon
} from '@material-ui/icons';
import { getWeatherChnnelsByUserId } from '../../../../redux/actions/channel.actions';

import { getForecastByCityName } from '../../../../redux/actions/weather.actions';
import styles from './styles';

class Sidebar extends Component {
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  componentWillMount() {
    const { dispatch } = this.props;

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(getWeatherChnnelsByUserId(user.data.id));
    }
  }

  getAvartarDisplayName = user => {
    return user
      ? user['firstName'].charAt(0).toUpperCase() +
          user['lastName'].charAt(0).toUpperCase()
      : '';
  };

  handleLoginClick = () => {
    const { history } = this.props;
    history.push('/login');
  }

  handleCityClick = (city) => {
    console.log(`handleCityClick clicked: ${city}`);
    
    const { dispatch } = this.props;
    dispatch(getForecastByCityName(city));
  }

  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    const { isAuthenticated, user, isChannelRequesting, channels } = this.props;
    const isValidChannel = channels && !this.isEmpty(channels);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link className={classes.logoLink} to="/">
            <img
              alt="Weathepia logo"
              className={classes.logoImage}
              src="/images/logos/weathepia_logo.svg"
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        {isAuthenticated ? (
          // user's sidebar menu view
          <Fragment>
            <div className={classes.profile}>
              <Avatar className={classes.avatar}>
                {this.getAvartarDisplayName(user)}
              </Avatar>
              <Typography className={classes.nameText} variant="h6">
                {user.firstName}
              </Typography>
              <Typography className={classes.bioText} variant="caption">
                {user.lastName}
              </Typography>
            </div>
            <Divider className={classes.profileDivider} />
            {isChannelRequesting ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <Fragment>
                {isValidChannel && (
                  <List component="div" disablePadding>
                    {channels.data.map(channel => (
                      <ListItem button
                        className={classes.listItem}
                        key={channel.id}
                        onClick={() => {this.handleCityClick(channel.city)}}
                      >
                        <ListItemIcon className={classes.listItemIcon}>
                          <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.listItemText }}
                          primary={channel.city}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Fragment>
            )}
          </Fragment>
        ) : (
          // empty view
          <Fragment>
            <div className={classes.emptyRoot}>
              <Grid
                alignItems="center"
                className={classes.emptyContainer}
                container
                direction="column"
                justify="center">
                <Grid item>
                  <IconButton
                    className={classes.emptyLoginButton}
                    onClick={this.handleLoginClick}>
                    <PlaylistAddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </Fragment>
        )}
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isChannelRequesting: PropTypes.bool.isRequired,
  channels: PropTypes.object,
};

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.authorization;
  const { isChannelRequesting, channels } = state.channel;
  return {
    isAuthenticated,
    user,
    isChannelRequesting,
    channels
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps)
)(Sidebar);
