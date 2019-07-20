import { facebookActionTypes } from '../types';
import { facebookService } from '../../services/facebook.service';

export function getPlacesByLocation(lat, lng) {
  return dispatch => {
    dispatch(request());

    facebookService.getPlacesByLocation(lat, lng, function(response) {
      if (response['data']) {
        dispatch(success(response));
      } else {
        dispatch(failure(response.error.message));
      }      
    });
  };

  function request() {
    return {
      type: facebookActionTypes.ACTION_FACEBOOK_PLACE_REQUEST
    };
  }

  function success(places) {
    return {
      type: facebookActionTypes.ACTION_FACEBOOK_PLACE_SUCCESS,
      places
    };
  }

  function failure(error) {
    return {
      type: facebookActionTypes.ACTION_FACEBOOK_PLACE_FAILURE,
      error
    };
  }
}
