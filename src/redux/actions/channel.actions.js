import { channelActionTypes } from '../types/channel.types';
import { channelService } from '../../services/channel.service';
import {  alertError } from './';

/**
 * Create a new weather channel for a user
 * @param {
 *  uid: number
 *  city: string
 * } data 
 */
export function createWeatherChannel(data) {
  return dispatch => {
    dispatch(request(data));

    channelService.createWeatherChannel(data)
      .then(response => {
        dispatch(success(response.data));

        // when it's done successfully, fetch weather channel list
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          dispatch(getWeatherChnnelsByUserId(user.data.id));
        }
      })
      .catch(error => {
        // const { statusCode, message }
        const { message } = error.response.data;

        // switch (statusCode) {
        //   case 404:
        //     // 404: user not found
        //     console.error(`channel error> ${message}`);
        //     break;

        //   default:
        //     console.error(`channel error> unexpected`);
        // }

        dispatch(failure(message));
        dispatch(alertError(message));
      });
  };

  function request(channel) {
    return {
      type: channelActionTypes.ACTION_CREATE_CHANNEL_REQUEST,
      channel
    };
  }

  function success(channel) {
    return {
      type: channelActionTypes.ACTION_CREATE_CHANNEL_SUCCESS,
      channel
    };
  }

  function failure(error) {
    return {
      type: channelActionTypes.ACTION_CREATE_CHANNEL_FAILURE,
      error
    };
  }
}

/**
 * Get a list of weather channel by user
 * @param {number} userId 
 */
export function getWeatherChnnelsByUserId(userId) {
  return dispatch => {
    dispatch(request(userId));

    channelService.getWeatherChnnelsByUserId(userId)
      .then(response => {
        dispatch(success(response));
      })
      .catch(error => {
        const { message } = error.response.data;
        dispatch(failure(message));
        dispatch(alertError(message));
      })
  };

  function request(userId) {
    return {
      type: channelActionTypes.ACTION_GET_CHANNEL_REQUEST,
      userId
    };
  }

  function success(channel) {
    return {
      type: channelActionTypes.ACTION_GET_CHANNEL_SUCCESS,
      channel
    };
  }

  function failure(error) {
    return {
      type: channelActionTypes.ACTION_GET_CHANNEL_FAILURE,
      error
    };
  }
}

/**
 * Delete a weather channel by weather channel id
 * @param {number} id 
 */
export function deleteWeatherChannelById(id) {
  return dispatch => {
    dispatch(request(id));

    channelService
      .deleteWeatherChannelById(id)
      .then(response => {
        dispatch(success(response));

        // when it's done successfully, fetch weather channel list
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          dispatch(getWeatherChnnelsByUserId(user.data.id));
        }
      })
      .catch(error => {
        const { message } = error.response.data;
        dispatch(failure(message));
        dispatch(alertError(message));
      });
  };
  
  function request(id) {
    return {
      type: channelActionTypes.ACTION_DELETE_CHANNEL_REQUEST,
      id
    };
  }

  function success(response) {
    return {
      type: channelActionTypes.ACTION_DELETE_CHANNEL_SUCCESS,
      response
    };
  }

  function failure(error) {
    return {
      type: channelActionTypes.ACTION_DELETE_CHANNEL_FAILURE,
      error
    };
  }
}

