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
  Typography
} from '@material-ui/core';

import { 
  LocationCityOutlined as LocationCityIcon,
  PlaylistAdd as PlaylistAddIcon
} from '@material-ui/icons';
import { RefForwardNavLink } from '../RefForwardNavLink';

import styles from './styles';

class Sidebar extends Component {

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

  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    const { isAuthenticated, user } = this.props;

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
              <Link to="/account">
                <Avatar className={classes.avatar}>
                  {this.getAvartarDisplayName(user)}
                </Avatar>
              </Link>
              <Typography className={classes.nameText} variant="h6">
                {user.firstName}
              </Typography>
              <Typography className={classes.bioText} variant="caption">
                {user.lastName}
              </Typography>
            </div>
            <Divider className={classes.profileDivider} />
            <List component="div" disablePadding>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={RefForwardNavLink}
                to="/dashboard">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Dashboard"
                />
              </ListItem>
              {/* <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/users">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Users"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/products">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Products"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/login">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Authentication"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/typography">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Typography"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/icons">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Icons and Images"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/account">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Account"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/settings">
                <ListItemIcon className={classes.listItemIcon}>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Settings"
                />
              </ListItem> */}
            </List>
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
                justify="center"
              >
                <Grid 
                  item
                >
                  <IconButton
                    className={classes.emptyLoginButton}
                    onClick={this.handleLoginClick}
                  >
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
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.authorization;
  return {
    isAuthenticated,
    user
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps)
)(Sidebar);
