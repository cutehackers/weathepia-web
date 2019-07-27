import api from './api.js';
import qs from 'qs';

export const articleService = {
  getArticles,
  deleteArticleById,
  createArticle
};

function getArticles() {
  return api.get('/articles');
}

function deleteArticleById(id) {
  return api.delete(`/articles/${id}`);
}

function createArticle(data) {
  return api.post('/articles', qs.stringify(data));
}
