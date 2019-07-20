import { facebookActionTypes } from '../types';

const initialState = {
  isFacebookRequesting: false,
  places: {}
};

export default function facebook(state = initialState, action) {
  switch (action.type) {
    case facebookActionTypes.ACTION_FACEBOOK_PLACE_REQUEST:
      return {
        isFacebookRequesting: true
      };

    case facebookActionTypes.ACTION_FACEBOOK_PLACE_SUCCESS:
      return {
        isFacebookRequesting: false,
        places: action.places
      };

    case facebookActionTypes.ACTION_FACEBOOK_PLACE_FAILURE:
      return {
        isFacebookRequesting: false,
        places: {}
      };

    default:
      return state;
  }
}
