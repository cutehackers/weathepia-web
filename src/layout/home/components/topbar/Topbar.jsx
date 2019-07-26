import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Badge,
  IconButton,
  Popover,
  Toolbar,
  Typography,
  InputBase
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from '@material-ui/icons';

import { getNotifications } from 'services/notification';
import { logout } from '../../../../redux/actions';
import { NotificationList } from './components';
import { getForecastByCityName } from '../../../../redux/actions/weather.actions';

// Component styles
import styles from './styles';

class Topbar extends Component {
  signal = true;

  state = {
    searchWords: '',
    notifications: [],
    notificationsLimit: 4,
    notificationsCount: 0,
    notificationsEl: null
  };

  async getNotifications() {
    try {
      const { notificationsLimit } = this.state;

      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit
      );

      if (this.signal) {
        this.setState({
          notifications,
          notificationsCount
        });
      }
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getNotifications();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSignOut = () => {
    const { dispatch } = this.props;

    dispatch(logout())
  };

  handleShowNotifications = event => {
    this.setState({
      notificationsEl: event.currentTarget
    });
  };

  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null
    });
  };

  handleSearchChange = event => {
    this.setState({
      searchWords: event.target.value
    })
  }

  handleSearchKeyDown = event => {
    if (event.key === 'Enter') {
      // trigger seather search api 
      const { dispatch } = this.props;
      dispatch(getForecastByCityName(event.target.value));
    }
  }

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar,
    } = this.props;

    const { 
      searchWords,
      notifications, 
      notificationsCount, 
      notificationsEl 
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showNotifications = Boolean(notificationsEl);

    const { isAuthenticated } = this.props;

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography 
              className={classes.title} 
              variant="h4"
            >
              {title}
            </Typography>
            
            {/* search-bar */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search city…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'Search' }}
                onChange={this.handleSearchChange}
                onKeyDown={this.handleSearchKeyDown}
                value={searchWords}
              />
            </div>

            {/* notification, sign-out */}
            {isAuthenticated && (
              <Fragment>
                <IconButton
                  className={classes.notificationsButton}
                  onClick={this.handleShowNotifications}
                >
                  <Badge
                    badgeContent={notificationsCount}
                    color="primary"
                    variant="dot"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  className={classes.signOutButton}
                  onClick={this.handleSignOut}
                >
                  <InputIcon />
                </IconButton>
              </Fragment>
            )}
          </Toolbar>
        </div>
        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          <NotificationList
            notifications={notifications}
            onSelect={this.handleCloseNotifications}
          />
        </Popover>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.authorization;
  return {
    isAuthenticated
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps)
)(Topbar);
