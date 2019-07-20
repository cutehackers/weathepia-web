import React, { Component } from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import styles from './styles';

class Places extends Component {
  render() {
    const { places } = this.props;
    console.log(`rendering place: ${JSON.stringify(places)}`);

    return <div />;
  }
}

Places.propTypes = {
  classes: PropTypes.object.isRequired,
  isFacebookRequesting: PropTypes.bool.isRequired,
  places: PropTypes.object,
};

function mapStateToProps(state) {
  const { isFacebookRequesting, places } = state.facebook;
  return {
    isFacebookRequesting,
    places
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Places);
