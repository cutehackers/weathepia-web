import { articleActionTypes } from '../types';

const initialState = {
  isArticleRequesting: false,
  articles: {}
};

export default function articles(state = initialState, action) {
  switch (action.type) {
    case articleActionTypes.ACTION_GET_ARTICLES_REQUEST:
      return {
        isArticleRequesting: true
      };
    case articleActionTypes.ACTION_GET_ARTICLES_SUCCESS:
      return {
        isArticleRequesting: false,
        articles: action.articles
      };
    case articleActionTypes.ACTION_GET_ARTICLES_FAILURE:
      return {
        isArticleRequesting: false,
        articles: {}
      };
    default:
      return state;
  }
}
