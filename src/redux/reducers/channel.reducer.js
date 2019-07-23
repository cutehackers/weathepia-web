import { channelActionTypes } from '../types';

const initialState = {
  isChannelRequesting: false,
  channels: {}
};

export default function channel(state = initialState, action) {
  switch (action.type) {
    case channelActionTypes.ACTION_GET_CHANNEL_REQUEST:
      return {
        isChannelRequesting: true
      };

    case channelActionTypes.ACTION_GET_CHANNEL_SUCCESS:
      return {
        isChannelRequesting: false,
        channels: action.channel
      };

    case channelActionTypes.ACTION_GET_CHANNEL_FAILURE:
      return {
        isChannelRequesting: false,
        channels: {}
      };

    default:
      return state;
  }
}
