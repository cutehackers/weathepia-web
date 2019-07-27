import { articleActionTypes } from '../types';
import { articleService } from '../../services/article.service';
import {  alertError } from './';

/**
 * Get an article list
 */
export function getArticles() {
  return dispatch => {
    dispatch(request());

    articleService.getArticles()
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        const { message } = error.response.data;
        dispatch(failure(message));
        dispatch(alertError(message));
      });
  };

  function request() {
    return {
      type: articleActionTypes.ACTION_GET_ARTICLES_REQUEST
    };
  }

  function success(articles) {
    return {
      type: articleActionTypes.ACTION_GET_ARTICLES_SUCCESS,
      articles
    };
  }

  function failure(error) {
    return {
      type: articleActionTypes.ACTION_GET_ARTICLES_FAILURE,
      error
    };
  }
}

/**
 * Delete an article 
 * @param {number} id 
 */
export function deleteArticleById(id) {
  return dispatch => {
    dispatch(request(id));

    articleService.deleteArticleById(id)
      .then(response => {
        dispatch(success(response))
        dispatch(getArticles());
      })
      .catch(error => {
        const { message } = error.response.data;
        dispatch(failure(message));
        dispatch(alertError(message));
      })
  };

  function request(id) {
    return {
      type: articleActionTypes.ACTION_DELETE_ARTICLE_REQUEST,
      id
    };
  }

  function success(response) {
    return {
      type: articleActionTypes.ACTION_DELETE_ARTICLE_SUCCESS,
      response
    };
  }

  function failure(error) {
    return {
      type: articleActionTypes.ACTION_DELETE_ARTICLE_FAILURE,
      error
    };
  }
}

/**
 * Create an article
 * @param {
 *   content: string
 * } data 
 */
export function createArticle(data) {
  return dispatch => {
    dispatch(request());

    articleService.createArticle(data)
      .then(response => {
        dispatch(success(response.data));
        dispatch(getArticles());
      })
      .catch(error => {
        const { message } = error;
        dispatch(failure(message));
        dispatch(alertError(message));
      })
  };

  function request() {
    return {
      type: articleActionTypes.ACTION_CREATE_ARTICLE_REQUEST
    };
  }

  function success(response) {
    return {
      type: articleActionTypes.ACTION_CREATE_ARTICLE_SUCCESS,
      response
    };
  }

  function failure(error) {
    return {
      type: articleActionTypes.ACTION_CREATE_ARTICLE_FAILURE,
      error
    };
  }
}
