import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getArticles = async () => {
  const response = await api.get('/articles');
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};

export const createArticle = async (article) => {
  const response = await api.post('/articles', article);
  return response.data;
};

export const updateArticle = async (id, article) => {
  const response = await api.put(`/articles/${id}`, article);
  return response.data;
};

// Rotas ainda não utilizadas. A serem implementadas posteiormente.

// export const deleteArticle = async (id) => {
//   const response = await api.delete(`/articles/${id}`);
//   return response.data;
// };

// export const searchArticlesByTag = async (tag) => {
//   const response = await api.get(`/articles/search/tag?tag=${tag}`);
//   return response.data;
// };

// export const searchArticlesByAuthor = async (authorId) => {
//   const response = await api.get(`/articles/search/author?authorId=${authorId}`);
//   return response.data;
// };