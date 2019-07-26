import React, { Component } from 'react';
// import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import HomePageLayout from '../../layout/home/HomePageLayout';
import styles from './styles';

/**
 * Article page container component
 */
class ArticlePage extends Component {
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    const { classes } = this.props;

    return (
      <HomePageLayout title="Article">
        <div className={classes.root} /> 
      </HomePageLayout>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// function mapStateToProps(state) {
//   const { isAuthenticated } = state.authorization;
//   const { isWeatherRequesting, forecast } = state.weather;
//   return {
//     isWeatherRequesting,
//     forecast,
//     isAuthenticated
//   };
// }

export default compose(
  withStyles(styles)
)(ArticlePage);
