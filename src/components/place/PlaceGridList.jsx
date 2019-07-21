import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { Portlet, PortletContent } from 'components';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import styles from './styles';


class PlaceGridList extends Component {
  render() {
    const { 
      classes, 
      isFacebookRequesting, 
      places 
    } = this.props;

    return (
      <Portlet className={classes.root}>
        <PortletContent noPadding>
          {isFacebookRequesting ? (
            <CircularProgress className={classes.progress} />
          ) : (
            places && (
              <div className={classes.horizontalGridContainer}>
                <GridList className={classes.placesGrid} cellHeight={'auto'} cols={2.5}>
                  {/* place grid list item */}
                  {places.data.map(place => (
                    <GridListTile key={place.id}>
                      <Portlet className={classes.itemContainer}>
                        <PortletContent noPadding>
                          <Typography variant="h4">{place.name}</Typography>
                          <Typography
                            className={classes.subtitle}
                            variant="body1"
                          >
                            {place.about}
                          </Typography>
                          {place.website && (
                            <Link 
                              variant="body1" 
                              href={place.website} 
                              target="_target" 
                              rel="noopener"
                            >
                              {place.website}
                            </Link>
                          )}
                          <Typography
                            className={classes.info}
                            variant="body1"
                          >
                            {place.single_line_address}
                          </Typography>
                        </PortletContent>
                        {place.cover && (
                          <Fragment>
                            <Divider className={classes.itemSeperator} />
                            <img 
                              alt="place cover"
                              className={classes.placeGridBackgroud}
                              src={place.cover.source}
                            />
                          </Fragment>
                        )}
                      </Portlet>
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            )
          )}
        </PortletContent>
      </Portlet>
    );
  }
}

PlaceGridList.propTypes = {
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
)(PlaceGridList);
